import { create } from 'zustand';
import { TOAST_PENDING } from '@constants';
import { employeeGeneralService } from '@services';
import { toast } from 'react-toastify';

const GET_EMPLOYEE_FAIL = 'Không thể tải dữ liệu nhân viên';
const CREATE_EMPLOYEE_SUCCESS = 'Tạo nhân viên thành công';
const CREATE_EMPLOYEE_FAIL = 'Không thể tạo nhân viên';

export const useEmployeeListStore = create<EmployeeListStore>()((set) => ({
  storeStatus: 'UNINIT',
  shops: [],
  employeeList: [],
  employeeOrder: {
    name: 'DESC',
    role: 'DESC',
    joinedAt: 'DESC',
    birthday: 'DESC',
    gender: 'DESC'
  },
  employeeFilter: { gender: [], role: [] },
  setOrder: async (employeeOrder) => {
    set(() => ({ employeeOrder }));
  },
  setFilter: async (employeeFilter) => {
    set(() => ({ employeeFilter }));
  },
  getEmployeeList: async (shopId, employeeOrder, employeeFilter) => {
    set(() => ({ storeStatus: 'PENDING' }));
    const id = toast.loading(TOAST_PENDING);
    toast.clearWaitingQueue();
    try {
      const employeeList = await employeeGeneralService.query(
        {
          order: employeeOrder,
          filter: employeeFilter
        },
        shopId
      );
      set(() => ({ employeeList, storeStatus: 'SUCCESS' }));
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
  getShopList: async () => {
    set(() => ({ storeStatus: 'PENDING' }));
    const id = toast.loading(TOAST_PENDING);
    toast.clearWaitingQueue();
    try {
      const shopList = await employeeGeneralService.getShops();
      set(() => ({ shops: shopList, storeStatus: 'SUCCESS' }));
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
  createEmployee: async (employee) => {
    set(() => ({ storeStatus: 'PENDING' }));
    const toastId = toast.loading('Đang xử lý');
    toast.clearWaitingQueue();
    try {
      await employeeGeneralService.postSingle(employee);
      set(() => ({ storeStatus: 'SUCCESS' }));
      toast.update(toastId, {
        type: 'success',
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
