import { Editor, Transforms, Element as SlateElement } from 'slate';
import { LIST_TYPES } from '@constants';
import { CustomEditor, CustomText, ElementType } from '@interfaces';

export const isBlockActive = (editor: CustomEditor, format: ElementType) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format
    })
  );

  return !!match;
};

export const toggleBlock = (editor: CustomEditor, format: ElementType) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && LIST_TYPES.includes(n.type),
    split: true
  });
  const newProperties: Partial<SlateElement> = {
    type: isActive
      ? ElementType.Paragraph
      : isList
      ? ElementType.ListItem
      : (format as SlateElement['type'])
  };
  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = {
      type: format,
      children: []
    } as SlateElement;
    Transforms.wrapNodes(editor, block);
  }
};

export const isMarkActive = (editor: CustomEditor, format: keyof Omit<CustomText, 'text'>) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

export const toggleMark = (editor: CustomEditor, format: keyof Omit<CustomText, 'text'>) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};
