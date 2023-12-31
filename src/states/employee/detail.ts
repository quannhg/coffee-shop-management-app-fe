import { create } from 'zustand';
import { employeeDetailService } from '@services';
import { toast } from 'react-toastify';

const GET_EMPLOYEE_FAIL = 'Không thể tải dữ liệu nhân viên';
const REMOVE_EMPLOYEE_SUCCESS = 'Xóa nhân viên thành công';
const UPDATE_EMPLOYEE_SUCCESS = 'Cập nhập thông tin nhân viên thành công';

export const useDetailEmployeeStore = create<DetailEmployeeStore>()((set, get) => ({
  member: undefined,
  getMember: async (id) => {
    try {
      const member = await employeeDetailService.query(id);
      set(() => ({ member }));
    } catch (err) {
      toast.error(GET_EMPLOYEE_FAIL, { autoClose: 2000 });
      toast.clearWaitingQueue();
    }
  },
  updateMember: async (id, employee) => {
    const toastId = toast.loading('Đang xử lý');
    toast.clearWaitingQueue();
    try {
      await employeeDetailService.update(id, employee);

      await get().getMember(id);
      toast.update(toastId, {
        type: 'success',
        render: UPDATE_EMPLOYEE_SUCCESS,
        isLoading: false,
        autoClose: 2000
      });
    } catch (err) {
      toast.update(toastId, {
        type: 'error',
        render: err.message,
        isLoading: false,
        autoClose: 2000
      });
    }
  },
  removeMember: async (id) => {
    const toastId = toast.loading('Đang xử lý');
    toast.clearWaitingQueue();
    try {
      await employeeDetailService.remove(id);
      toast.update(toastId, {
        type: 'success',
        render: REMOVE_EMPLOYEE_SUCCESS,
        isLoading: false,
        autoClose: 2000
      });
    } catch (err) {
      toast.update(toastId, {
        type: 'error',
        render: err.message,
        isLoading: false,
        autoClose: 2000
      });
    }
  }
}));
