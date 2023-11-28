import { RenderElementProps } from 'slate-react';

interface Props extends RenderElementProps {
  children: React.ReactNode;
}

export const EditorLinkElement: Component<Props> = ({ children, element, attributes }) => {
  const url = 'link' in element ? element.link : null;

  if (!url) {
    return null;
  }

  return (
    <a
      {...attributes}
      href={`${url}`}
      target='_blank'
      rel='noreferrer noopener'
      className={'underline'}
    >
      {children}
    </a>
  );
};
