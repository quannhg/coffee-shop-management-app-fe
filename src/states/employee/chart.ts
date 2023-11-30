import { create } from 'zustand';
import { employeeChartService } from '@services';
import { toast } from 'react-toastify';

const GET_AGE_DISTRIBUTE_FAIL = 'Không thể tải dữ liệu phân phối độ tuổi';
const GET_GENDER_DISTRIBUTE_FAIL = 'Không thể tải dữ liệu phân phối giới tính';

export const useChartStore = create<ChartStore>()((set) => ({
  ageDistribute: { age: [], amount: [] },
  genderDistribute: { gender: [], amount: [] },
  getAgeDistribute: async (shopId) => {
    try {
      const ageDistribute = await employeeChartService.ageDistribute(shopId);
      set(() => ({ ageDistribute }));
    } catch (err) {
      toast.error(GET_AGE_DISTRIBUTE_FAIL);
      toast.clearWaitingQueue();
    }
  },
  getGenderDistribute: async (shopId) => {
    try {
      const genderDistribute = await employeeChartService.genderDistribute(shopId);
      set(() => ({ genderDistribute }));
    } catch (err) {
      toast.error(GET_GENDER_DISTRIBUTE_FAIL);
      toast.clearWaitingQueue();
    }
  }
}));
