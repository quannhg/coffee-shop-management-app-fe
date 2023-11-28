import {
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Typography
} from '@material-tailwind/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Code, ListUl, Quote, TypeBold, Fonts, TypeItalic, ListOl } from 'react-bootstrap-icons';
import { useSlate } from 'slate-react';
import { ElementType, BlockButtonProps, MarkButtonProps, BlockTypographyProps } from '@interfaces';
import { isBlockActive, toggleMark, toggleBlock, isMarkActive } from '@utils';

export function EditorToolbar() {
  return (
    <div className='flex flex-wrap gap-1 border-b divide-x divide-gray-300'>
      <div className='flex'>
        <MarkButton format='bold' icon={<TypeBold aria-label='bold' />} />
        <MarkButton format='italic' icon={<TypeItalic aria-label='italic' />} />
        <MarkButton format='code' icon={<Code aria-label='code' />} />
      </div>
      <div className='flex'>
        <MenuFontSize />
        <BlockButton format={ElementType.Blockquote} icon={<Quote aria-label='block-quote' />} />
        <BlockButton
          format={ElementType.BulletedList}
          icon={<ListUl aria-label='bulleted-list' />}
        />
        <BlockButton
          format={ElementType.NumberedList}
          icon={<ListOl aria-label='numbered-list' />}
        />
      </div>
    </div>
  );
}

const BlockButton: Component<BlockButtonProps> = ({ format, icon }) => {
  const editor = useSlate();
  const isActive = isBlockActive(editor, format);

  return (
    <Button
      tabIndex={-1}
      title={format}
      type='button'
      variant='text'
      color='gray'
      className={
        '!shadow-none text-black text-xl p-1 px-2 rounded-md transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ' +
        (isActive ? 'text-white bg-gray-700 hover:bg-gray-500' : 'hover:bg-gray-400')
      }
      onClick={() => toggleBlock(editor, format)}
    >
      {icon}
    </Button>
  );
};

const MarkButton: Component<MarkButtonProps> = ({ format, icon }) => {
  const editor = useSlate();
  const isActive = isMarkActive(editor, format);

  return (
    <Button
      tabIndex={-1}
      title={format}
      type='button'
      variant='text'
      color='gray'
      className={
        '!shadow-none text-black text-xl p-1 px-2 rounded-md transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ' +
        (isActive ? 'text-white bg-gray-700 hover:bg-gray-500' : 'hover:bg-gray-400')
      }
      onClick={() => toggleMark(editor, format)}
    >
      {icon}
    </Button>
  );
};

const MenuFontSize = () => {
  const editor = useSlate();

  const BlockTypography: Component<BlockTypographyProps> = ({ format, content }) => {
    const isActive = isBlockActive(editor, format);
    const SIZE_FORMAT = {
      heading_one: 'h4',
      heading_two: 'h5',
      heading_three: 'h6'
    };

    return (
      <Typography
        variant={SIZE_FORMAT[format as keyof typeof SIZE_FORMAT]}
        color='gray'
        className={
          '!shadow-none text-black p-1 px-2 rounded-md transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ' +
          (isActive ? 'text-white bg-gray-700 hover:bg-gray-500' : 'hover:bg-gray-400')
        }
        onClick={() => toggleBlock(editor, format)}
      >
        {content}
      </Typography>
    );
  };

  const ELEMENT = [
    {
      format: ElementType.HeadingOne,
      content: 'Very Huge'
    },
    {
      format: ElementType.HeadingTwo,
      content: 'Huge'
    },
    {
      format: ElementType.HeadingThree,
      content: 'Large'
    }
  ];

  const activeCount = ELEMENT.reduce((count, element) => {
    const isActive = isBlockActive(editor, element.format);
    return count + (isActive ? 1 : 0);
  }, 0);

  return (
    <Menu>
      <MenuHandler>
        <Button
          tabIndex={-1}
          title='font-size'
          variant='text'
          color='gray'
          className={
            'flex items-center !shadow-none text-black text-xl p-1 px-2 rounded-md transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ' +
            (activeCount ? 'text-white bg-gray-700 hover:bg-gray-500' : 'hover:bg-gray-400')
          }
        >
          <Fonts aria-label='font-size' />
          <ChevronDownIcon className='w-4 h-4' />
        </Button>
      </MenuHandler>
      <MenuList className='z-[10000]'>
        {ELEMENT.map((element, index) => (
          <MenuItem key={index} className='hover:!bg-white active:!bg-white focus:!bg-white'>
            <BlockTypography format={element.format} content={element.content} />
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
