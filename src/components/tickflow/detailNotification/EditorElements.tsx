import type { RenderElementProps } from 'slate-react';
import { ElementType, CustomElement } from '@interfaces';
import { EditorLinkElement } from './EditorLinkElement';

type ComponentItem = (props: RenderElementProps & { element: CustomElement }) => JSX.Element;

const components: Record<string, ComponentItem> = {
  [ElementType.Blockquote]: ({ children, attributes }) => (
    <blockquote {...attributes} className='border-l-[3px] pl-2'>
      {children}
    </blockquote>
  ),
  [ElementType.BulletedList]: ({ children, attributes }) => (
    <ul {...attributes} className='list-disc'>
      {children}
    </ul>
  ),
  [ElementType.HeadingOne]: ({ children, attributes }) => (
    <h1 {...attributes} className='text-3xl font-semibold'>
      {children}
    </h1>
  ),
  [ElementType.HeadingTwo]: ({ children, attributes }) => (
    <h2 {...attributes} className='text-2xl font-semibold'>
      {children}
    </h2>
  ),
  [ElementType.HeadingThree]: ({ children, attributes }) => (
    <h3 {...attributes} className='text-xl font-semibold'>
      {children}
    </h3>
  ),
  [ElementType.ListItem]: ({ children, attributes }) => (
    <li {...attributes} data-list-item='true' className='space-x-6'>
      {children}
    </li>
  ),
  [ElementType.NumberedList]: ({ children, attributes }) => (
    <ol {...attributes} className='list-decimal'>
      {children}
    </ol>
  ),
  [ElementType.Link]: ({ children, attributes, element }) => (
    <EditorLinkElement {...{ attributes, children, element }} />
  )
};

export const EditorElement: Component<RenderElementProps> = ({ attributes, children, element }) => {
  const component = components[element.type] as ComponentItem | undefined;

  if (component) {
    return component({ children, attributes, element });
  }

  return <div {...attributes}>{children}</div>;
};
