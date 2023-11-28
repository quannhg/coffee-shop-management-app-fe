import slate from 'remark-slate';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import { ElementType } from '@interfaces';

export const NUMBER_OF_STEP_SENDING_NOTIFICATION = 3;

export const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic'
} as const;

export const LIST_TYPES = [ElementType.NumberedList, ElementType.BulletedList] as string[];

export const NOTIFICATION_MEDIA_TAB = ['Gmail', 'Discord'];

export const PROCESSOR = unified().use(remarkParse).use(slate);
