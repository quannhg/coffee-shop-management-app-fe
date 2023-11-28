import { useState } from 'react';
import { Chip, Tooltip } from '@material-tailwind/react';

export const ShowElementType: Component<{
  elementTypes: string[];
  numVisibleProductType: number;
}> = ({ elementTypes, numVisibleProductType }) => {
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false)
  };

  return (
    <div className='flex lg:flex-wrap items-center gap-1'>
      {elementTypes &&
        elementTypes
          .slice(0, numVisibleProductType)
          .map((type, index) => (
            <Chip
              key={index}
              size='sm'
              variant='outlined'
              className='w-fit rounded-full capitalize border-gray-500 text-gray-600'
              value={type}
            />
          ))}
      {elementTypes && elementTypes.length > numVisibleProductType && (
        <Tooltip
          open={openPopover}
          handler={setOpenPopover}
          {...triggers}
          placement='bottom'
          className='bg-white border border-blue-gray-50 shadow-xl shadow-black/10 px-4 py-3'
          content={
            <div className='flex flex-col gap-2'>
              {elementTypes.slice(numVisibleProductType).map((type, index) => (
                <Chip
                  key={index + numVisibleProductType}
                  size='sm'
                  variant='outlined'
                  className='rounded-full capitalize border-gray-500 text-gray-600'
                  value={type}
                />
              ))}
            </div>
          }
        >
          <Chip
            size='sm'
            variant='outlined'
            color='blue-gray'
            value={<span>+{elementTypes.length - numVisibleProductType}</span>}
            className='rounded-full capitalize border-gray-500 text-gray-600'
          />
        </Tooltip>
      )}
    </div>
  );
};
