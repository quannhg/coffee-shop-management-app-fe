import { create } from 'zustand';
import { TOAST_PENDING } from '@constants';
import { employeeGeneralService } from '@services';
import { toast } from 'react-toastify';

const GET_EMPLOYEE_FAIL = 'Không thể tải dữ liệu nhân viên';

export const useEmployeeListStore = create<EmployeeListStore>()((set, get) => ({
  storeStatus: 'UNINIT',
  memberList: [],
  employeeOrder: {},
  employeeFilter: {},
  setOrder: (employeeOrder) => {
    set(() => ({ employeeOrder }));
  },
  setFilter: (employeeFilter) => {
    set(() => ({ employeeFilter }));
  },
  getMemberList: async () => {
    set(() => ({ storeStatus: 'PENDING' }));
    const id = toast.loading(TOAST_PENDING);
    toast.clearWaitingQueue();
    try {
      const memberList = await employeeGeneralService.query({
        order: get().employeeOrder,
        filter: get().employeeFilter
      });
      set(() => ({ memberList, storeStatus: 'SUCCESS' }));
      toast.done(id);
    } catch (err) {
      set(() => ({ storeStatus: 'REJECT' }));
      toast.update(id, {
        render: GET_EMPLOYEE_FAIL,
        type: 'error',
        isLoading: false,
        autoClose: 2000
      });
    }
  }
}));
