import React from 'react';
import isHotkey from 'is-hotkey';
import { HOTKEYS } from '@constants';
import { CustomEditor } from '@interfaces';
import { toggleMark } from './editorBlock';

export const handleEditorHotkeys = (event: React.KeyboardEvent, editor: CustomEditor) => {
  for (const hotkey in HOTKEYS) {
    if (isHotkey(hotkey)(event)) {
      event.preventDefault();
      const mark = HOTKEYS[hotkey as keyof typeof HOTKEYS];
      toggleMark(editor, mark);
    }
  }
};
