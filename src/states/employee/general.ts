import { create } from 'zustand';
import { TOAST_PENDING } from '@constants';
import { employeeGeneralService } from '@services';
import { toast } from 'react-toastify';

const GET_EMPLOYEE_FAIL = 'Không thể tải dữ liệu nhân viên';
const CREATE_EMPLOYEE_SUCCESS = 'Tạo nhân viên thành công';
const CREATE_EMPLOYEE_FAIL = 'Không thể tạo nhân viên';

export const useEmployeeListStore = create<EmployeeListStore>()((set, get) => ({
  storeStatus: 'UNINIT',
  memberList: [],
  employeeOrder: {},
  employeeFilter: { gender: [], role: [] },
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
  },
  createMember: async (employee: CreateEmployeeDto) => {
    set(() => ({ storeStatus: 'PENDING' }));
    const toastId = toast.loading('Đang xử lý');
    toast.clearWaitingQueue();
    try {
      await employeeGeneralService.postSingle(employee);
      get().getMemberList();
      set(() => ({ storeStatus: 'SUCCESS' }));
      toast.update(toastId, {
        type: 'info',
        render: CREATE_EMPLOYEE_SUCCESS,
        isLoading: false,
        autoClose: 2000
      });
    } catch (err) {
      set(() => ({ storeStatus: 'REJECT' }));
      toast.update(toastId, {
        type: 'error',
        render: CREATE_EMPLOYEE_FAIL,
        isLoading: false,
        autoClose: 2000
      });
    }
  }
}));
