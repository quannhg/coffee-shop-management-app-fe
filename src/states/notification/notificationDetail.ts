import { create } from 'zustand';
import { NOTIFICATION_MEDIA_TAB } from '@constants';

export const useNotificationDetailStore = create<NotificationDetailStore>()((set) => ({
  sendingStep: 1,
  mediaTab: NOTIFICATION_MEDIA_TAB[1],
  editorReadOnly: false,
  approveProposalParams: null,
  setSendingStep: (payload) => {
    set(() => ({ sendingStep: payload }));
  },
  setMediaTab: (payload) => {
    set(() => ({ mediaTab: payload }));
  },
  setEditorReadOnly: (payload) => {
    set(() => ({ editorReadOnly: payload }));
  },
  setApproveProposalParams: (payload) => {
    set(() => ({ approveProposalParams: payload }));
  }
}));
