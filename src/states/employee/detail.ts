import { create } from 'zustand';
import { employeeDetailService } from '@services';
import { toast } from 'react-toastify';

const GET_EMPLOYEE_FAIL = 'Không thể tìm kiếm nhân viên';

export const useEmployeeListStore = create<DetailEmployeeStore>()((set) => ({
  member: undefined,
  getMember: async (id) => {
    try {
      const member = await employeeDetailService.query(id);
      set(() => ({ member }));
    } catch (err) {
      toast.error(GET_EMPLOYEE_FAIL);
      toast.clearWaitingQueue();
    }
  }
}));
