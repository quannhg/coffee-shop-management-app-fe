import { create } from 'zustand';
import { toast } from 'react-toastify';
import { TOAST_PENDING } from '@constants';
import { memberGeneralService } from '@services';

export const useMemberGeneralStore = create<MemberGeneralStore>()((set, get) => ({
  statusMemberGeneral: 'UNINIT',
  memberGeneral: {
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
  setMemberGeneral: (payload) => {
    set(() => ({ memberGeneral: payload }));
  },
  queryMember: async (payload) => {
    set(() => ({ statusMemberGeneral: 'PENDING' }));
    try {
      const memberGeneral = await memberGeneralService.query(payload);
      set(() => ({ memberGeneral: memberGeneral, statusMemberGeneral: 'SUCCESS' }));
    } catch (err) {
      set(() => ({ statusMemberGeneral: 'REJECT' }));
    }
  },
  createMember: async (payload, memberParam) => {
    set(() => ({ statusMemberGeneral: 'PENDING' }));
    const id = toast.loading(TOAST_PENDING);
    toast.clearWaitingQueue();
    try {
      await memberGeneralService.create(payload);
      await get().queryMember(memberParam);
      set(() => ({ statusMemberGeneral: 'SUCCESS' }));
      toast.update(id, {
        render: `Member ${payload.name} is added successfully`,
        type: 'success',
        isLoading: false,
        autoClose: 2000
      });
    } catch (err) {
      set(() => ({ statusMemberGeneral: 'REJECT' }));
      toast.update(id, {
        render: `Member ${payload.name} is added failure`,
        type: 'error',
        isLoading: false,
        autoClose: 2000
      });
    }
  }
}));
