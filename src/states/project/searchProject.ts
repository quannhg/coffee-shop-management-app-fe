import { create } from 'zustand';

export const useProjectSearchStore = create<ProjectSearchStore>()((set) => ({
  listProject: [],
  setListProject: (payload) => {
    set(() => ({ listProject: payload }));
  }
}));
