import { create } from 'zustand';
import { PROJECT_TIME } from '@constants';

export const useFilterProjectStore = create<FilterProjectStore>()((set) => ({
  status: [],
  timeInterval: PROJECT_TIME[0],
  selectStatus: (status) => {
    set((state) => {
      const newStatus = [...state.status];
      const idx = newStatus.findIndex((item) => item === status);
      if (idx !== -1) {
        newStatus.splice(idx, 1);
        return { status: newStatus };
      } else {
        const resultStatus = [...state.status, status];
        return { status: resultStatus };
      }
    });
  },
  selectTimeInterval: (timeInterval) => {
    set(() => ({ timeInterval: timeInterval }));
  },
  removeStatus: () => {
    set(() => ({ status: [] }));
  }
}));
