import { Descendant, BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';

export enum ElementType {
  Blockquote = 'block_quote',
  BulletedList = 'ul_list',
  NumberedList = 'ol_list',
  HeadingOne = 'heading_one',
  HeadingTwo = 'heading_two',
  HeadingThree = 'heading_three',
  ListItem = 'list_item',
  Paragraph = 'paragraph',
  Link = 'link'
}

export type BlockQuoteElement = {
  type: ElementType.Blockquote;
  children: Descendant[];
};

export type BulletedListElement = {
  type: ElementType.BulletedList;
  children: Descendant[];
};

export type NumberedListElement = {
  type: ElementType.NumberedList;
  children: Descendant[];
};

export type HeadingOneElement = {
  type: ElementType.HeadingOne;
  children: Descendant[];
};

export type HeadingTwoElement = {
  type: ElementType.HeadingTwo;
  children: Descendant[];
};

export type HeadingThreeElement = {
  type: ElementType.HeadingThree;
  children: Descendant[];
};

export type ListItemElement = {
  type: ElementType.ListItem;
  children: Descendant[];
};

export type ParagraphElement = {
  type: ElementType.Paragraph;
  children: Descendant[];
};

export type LinkElement = {
  type: ElementType.Link;
  link: string;
  children: Descendant[];
};

export type CustomElement =
  | BlockQuoteElement
  | BulletedListElement
  | NumberedListElement
  | HeadingOneElement
  | HeadingTwoElement
  | HeadingThreeElement
  | ListItemElement
  | ParagraphElement
  | LinkElement;

export interface BlockButtonProps {
  format: ElementType;
  icon: React.ReactNode;
}

export interface MarkButtonProps {
  format: keyof Omit<CustomText, 'text'>;
  icon: React.ReactNode;
}

export interface BlockTypographyProps {
  format: ElementType;
  content: string;
}

export type CustomText = {
  bold?: boolean;
  italic?: boolean;
  code?: boolean;
  text: string;
};

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
