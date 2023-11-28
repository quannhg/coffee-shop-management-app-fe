import { create } from 'zustand';
import { employeeGeneralService } from '@services';
import { toast } from 'react-toastify';

const GET_EMPLOYEE_FAIL = 'Không thể tìm kiếm nhân viên';

export const useEmployeeListStore = create<SearchEmployeeListStore>()((set) => ({
  employeeListForSearch: [],
  getEmployeeListForSearch: async (keyword) => {
    try {
      const employeeListForSearch = await employeeGeneralService.search(keyword);
      set(() => ({ employeeListForSearch }));
    } catch (err) {
      toast.error(GET_EMPLOYEE_FAIL);
      toast.clearWaitingQueue();
    }
  }
}));
