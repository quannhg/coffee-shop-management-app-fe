import { create } from 'zustand';
import { notificationGeneralService } from '@services';

export const useNotificationGeneralStore = create<NotificationGeneralStore>()((set) => ({
  statusNotiGeneral: 'UNINIT',
  notificationGeneral: {
    metadata: {
      totalPage: 0
    },
    data: []
  },
  activePage: 1,
  inputPage: '1',
  setActivePage: (payload) => {
    set(() => ({ activePage: payload }));
  },
  setInputPage: (payload) => {
    set(() => ({ inputPage: payload }));
  },
  queryNotification: async (payload) => {
    set(() => ({ statusNotiGeneral: 'PENDING' }));
    try {
      const notificationGeneral = await notificationGeneralService.query(payload);
      set(() => ({ notificationGeneral: notificationGeneral, statusNotiGeneral: 'SUCCESS' }));
    } catch (err) {
      set(() => ({ statusNotiGeneral: 'REJECT' }));
    }
  }
}));
