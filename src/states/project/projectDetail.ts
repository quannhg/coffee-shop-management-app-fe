import { create } from 'zustand';
import { PROJECT_DETAIL_MOBILE_TAB, PROJECT_DETAIL_DESKTOP_TAB } from '@constants';
import { projectDetailService } from '@services';
import {
  TOAST_PENDING,
  PROJECT_DELETE_FAILURE,
  PROJECT_DELETE_SUCCESSFULLY,
  PROJECT_EDIT_FAILURE,
  PROJECT_EDIT_SUCCESSFULLY,
  PROJECT_EDIT_STATUS_FAILURE,
  PROJECT_EDIT_STATUS_SUCCESSFULLY
} from '@constants';

import { toast } from 'react-toastify';

export const useProjectDetailStore = create<ProjectDetailStore>()((set, get) => ({
  statusDetail: 'UNINIT',
  projectDetail: {
    id: '',
    name: '',
    productType: [],
    description: '',
    status: 'PROPOSAL',
    startDate: 0,
    endDate: 0,
    avatarUrl: ''
  },
  mobileTabView: PROJECT_DETAIL_MOBILE_TAB[0],
  desktopTabView: PROJECT_DETAIL_DESKTOP_TAB[0].tab,
  getProjectById: async (projectId) => {
    set(() => ({ statusDetail: 'PENDING' }));
    try {
      const projectDetail = await projectDetailService.getById(projectId);
      set(() => ({ statusDetail: 'SUCCESS', projectDetail: projectDetail }));
    } catch (err) {
      set(() => ({ statusDetail: 'REJECT' }));
    }
  },
  updateProject: async (payload) => {
    set(() => ({ statusDetail: 'PENDING' }));
    const id = toast.loading(TOAST_PENDING);
    toast.clearWaitingQueue();
    try {
      const projectId = get().projectDetail.id;
      await projectDetailService.update(projectId, payload);
      await get().getProjectById(projectId);
      set(() => ({ statusDetail: 'SUCCESS' }));
      toast.update(id, {
        render: PROJECT_EDIT_SUCCESSFULLY,
        type: 'success',
        isLoading: false,
        autoClose: 2000
      });
    } catch (err) {
      set(() => ({ statusDetail: 'REJECT' }));
      toast.update(id, {
        render: PROJECT_EDIT_FAILURE,
        type: 'success',
        isLoading: false,
        autoClose: 2000
      });
    }
  },
  removeProject: async () => {
    set(() => ({ statusDetail: 'PENDING' }));
    const id = toast.loading(TOAST_PENDING);
    toast.clearWaitingQueue();
    try {
      await projectDetailService.remove(get().projectDetail.id);
      set(() => ({ statusDetail: 'SUCCESS' }));
      toast.update(id, {
        render: PROJECT_DELETE_SUCCESSFULLY,
        type: 'success',
        isLoading: false,
        autoClose: 2000
      });
    } catch (err) {
      set(() => ({ statusDetail: 'REJECT' }));
      toast.update(id, {
        render: PROJECT_DELETE_FAILURE,
        type: 'success',
        isLoading: false,
        autoClose: 2000
      });
    }
  },
  updateStatus: async (payload) => {
    set(() => ({ statusDetail: 'PENDING' }));
    const id = toast.loading(TOAST_PENDING);
    toast.clearWaitingQueue();
    try {
      const projectId = get().projectDetail.id;
      await projectDetailService.updateStatus(projectId, payload);
      await get().getProjectById(projectId);
      set(() => ({ statusDetail: 'SUCCESS' }));
      toast.update(id, {
        render: PROJECT_EDIT_STATUS_SUCCESSFULLY,
        type: 'success',
        isLoading: false,
        autoClose: 2000
      });
    } catch (err) {
      set(() => ({ statusDetail: 'REJECT' }));
      toast.update(id, {
        render: PROJECT_EDIT_STATUS_FAILURE,
        type: 'error',
        isLoading: false,
        autoClose: 2000
      });
    }
  },
  setMobileTabView: (payload) => {
    set(() => ({ mobileTabView: payload }));
  },
  setDesktopTabView: (payload) => {
    set(() => ({ desktopTabView: payload }));
  }
}));
