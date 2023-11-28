import { create } from 'zustand';
import { TOAST_PENDING } from '@constants';
import { projectGeneralService } from '@services';
import { toast } from 'react-toastify';

export const useProjectGeneralStore = create<ProjectGeneralStore>()((set, get) => ({
  statusGeneral: 'UNINIT',
  projectGeneral: {
    pageNumber: 0,
    pageNumberMax: 0,
    pageSize: 0,
    totalProjects: 0,
    projects: []
  },
  activePage: 1,
  inputPage: '1',
  setInputPage: (payload) => {
    set(() => ({ inputPage: payload }));
  },
  setActivePage: (payload) => {
    set(() => ({ activePage: payload }));
  },
  queryProject: async (payload) => {
    set(() => ({ statusGeneral: 'PENDING' }));
    try {
      const projectGeneral = await projectGeneralService.query(payload);
      set(() => ({ projectGeneral: projectGeneral, statusGeneral: 'SUCCESS' }));
    } catch (err) {
      set(() => ({ statusGeneral: 'REJECT' }));
    }
  },
  createProject: async (payload, projectParam) => {
    set(() => ({ statusGeneral: 'PENDING' }));
    const id = toast.loading(TOAST_PENDING);
    toast.clearWaitingQueue();
    try {
      await projectGeneralService.create(payload);
      await get().queryProject(projectParam);
      set(() => ({ statusGeneral: 'SUCCESS' }));
      toast.update(id, {
        render: `Project ${payload.name} is added successfully`,
        type: 'success',
        isLoading: false,
        autoClose: 2000
      });
    } catch (err) {
      set(() => ({ statusGeneral: 'REJECT' }));
      toast.update(id, {
        render: `Project ${payload.name} is added failure`,
        type: 'error',
        isLoading: false,
        autoClose: 2000
      });
    }
  }
}));
