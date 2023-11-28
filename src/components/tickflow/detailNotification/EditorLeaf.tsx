import { RenderLeafProps } from 'slate-react';

export const EditorLeaf: Component<RenderLeafProps> = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.code) {
    children = <code className='bg-gray-300 p-0.5 px-1 rounded-md'>{children}</code>;
  }

  return <span {...attributes}>{children}</span>;
};
