import { create } from 'zustand';
import {
  TOAST_PENDING,
  PERSONNEL_ADD_SUCCESSFULLY,
  PERSONNEL_ADD_FAILURE,
  PERSONNEL_UPDATE_SUCCESSFULLY,
  PERSONNEL_UPDATE_FAILURE,
  PERSONNEL_LEAVING_SUCCESSFULLY,
  PERSONNEL_LEAVING_FAILURE,
  PERSONNEL_DELETE_SUCCESSFULLY,
  PERSONNEL_DELETE_FAILURE
} from '@constants';
import { personnelProjectGeneralService } from '@services';
import { toast } from 'react-toastify';

export const usePersonnelProjectGeneralStore = create<PersonnelProjectGeneralStore>()(
  (set, get) => ({
    statusPersonnel: 'UNINIT',
    personnelList: {
      metadata: {
        total: 0,
        leader: 0,
        member: 0,
        mentor: 0,
        leaved: 0
      },
      data: []
    },
    getPersonnelProject: async (projectId) => {
      set(() => ({ statusPersonnel: 'PENDING' }));
      try {
        const personnelList = await personnelProjectGeneralService.getPersonnel(projectId);
        set(() => ({ statusPersonnel: 'SUCCESS', personnelList: personnelList }));
      } catch (err) {
        set(() => ({ statusPersonnel: 'REJECT' }));
      }
    },
    createPersonnelProject: async (projectId, payload) => {
      set(() => ({ statusPersonnel: 'PENDING' }));
      const id = toast.loading(TOAST_PENDING);
      toast.clearWaitingQueue();
      try {
        await personnelProjectGeneralService.createPersonnel(projectId, payload);
        await get().getPersonnelProject(projectId);
        set(() => ({ statusPersonnel: 'SUCCESS' }));
        toast.update(id, {
          render: PERSONNEL_ADD_SUCCESSFULLY,
          type: 'success',
          isLoading: false,
          autoClose: 2000
        });
      } catch (err) {
        set(() => ({ statusPersonnel: 'REJECT' }));
        toast.update(id, {
          render: PERSONNEL_ADD_FAILURE,
          type: 'error',
          isLoading: false,
          autoClose: 2000
        });
      }
    },
    updatePersonnelProject: async (projectId, payload) => {
      set(() => ({ statusPersonnel: 'PENDING' }));
      const id = toast.loading(TOAST_PENDING);
      toast.clearWaitingQueue();
      try {
        await personnelProjectGeneralService.updatePersonnel(projectId, payload);
        await get().getPersonnelProject(projectId);
        set(() => ({ statusPersonnel: 'SUCCESS' }));
        toast.update(id, {
          render: PERSONNEL_UPDATE_SUCCESSFULLY,
          type: 'success',
          isLoading: false,
          autoClose: 2000
        });
      } catch (err) {
        set(() => ({ statusPersonnel: 'REJECT' }));
        toast.update(id, {
          render: PERSONNEL_UPDATE_FAILURE,
          type: 'error',
          isLoading: false,
          autoClose: 2000
        });
      }
    },
    markLeavingProject: async (projectId, userId) => {
      set(() => ({ statusPersonnel: 'PENDING' }));
      const id = toast.loading(TOAST_PENDING);
      toast.clearWaitingQueue();
      try {
        await personnelProjectGeneralService.markLeaving(projectId, userId);
        await get().getPersonnelProject(projectId);
        set(() => ({ statusPersonnel: 'SUCCESS' }));
        toast.update(id, {
          render: PERSONNEL_LEAVING_SUCCESSFULLY,
          type: 'success',
          isLoading: false,
          autoClose: 2000
        });
      } catch (err) {
        set(() => ({ statusPersonnel: 'REJECT' }));
        toast.update(id, {
          render: PERSONNEL_LEAVING_FAILURE,
          type: 'error',
          isLoading: false,
          autoClose: 2000
        });
      }
    },
    removePersonnelProject: async (projectId, userId) => {
      set(() => ({ statusPersonnel: 'PENDING' }));
      const id = toast.loading(TOAST_PENDING);
      toast.clearWaitingQueue();
      try {
        await personnelProjectGeneralService.removePersonnel(projectId, userId);
        await get().getPersonnelProject(projectId);
        set(() => ({ statusPersonnel: 'SUCCESS' }));
        toast.update(id, {
          render: PERSONNEL_DELETE_SUCCESSFULLY,
          type: 'success',
          isLoading: false,
          autoClose: 2000
        });
      } catch (err) {
        set(() => ({ statusPersonnel: 'REJECT' }));
        toast.update(id, {
          render: PERSONNEL_DELETE_FAILURE,
          type: 'error',
          isLoading: false,
          autoClose: 2000
        });
      }
    }
  })
);
