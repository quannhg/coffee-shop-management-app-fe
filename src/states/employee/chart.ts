import { create } from 'zustand';
import { employeeChartService, employeeGeneralService } from '@services';
import { toast } from 'react-toastify';

const GET_AGE_DISTRIBUTE_FAIL = 'Không thể tải dữ liệu phân phối độ tuổi';
const GET_GENDER_DISTRIBUTE_FAIL = 'Không thể tải dữ liệu phân phối giới tính';

export const useChartStore = create<ChartStore>()((set) => ({
  ageDistribute: { age: [], amount: { female: [], male: [] } },
  genderDistribute: { gender: [], amount: [] },
  tableDistribute: { statuses: [], amount: [] },
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
      if (shopId !== 'all') {
        const genderDistribute = await employeeChartService.genderDistribute(shopId);
        set(() => ({ genderDistribute }));
      } else {
        const genderDistribute = { gender: ['Nam' as Gender, 'Nữ' as Gender], amount: [0, 0] };
        const shopList = await employeeGeneralService.getShops();

        for (const shop of shopList) {
          const genderDistributeOfShop = await employeeChartService.genderDistribute(shop.id);
          genderDistribute.amount[0] += genderDistributeOfShop.amount[0];
          genderDistribute.amount[1] += genderDistributeOfShop.amount[1];
        }
        set(() => ({ genderDistribute: genderDistribute }));
      }
    } catch (err) {
      toast.error(GET_GENDER_DISTRIBUTE_FAIL);
      toast.clearWaitingQueue();
    }
  },
  getTableDistribute: async (shopId) => {
    try {
      if (shopId !== 'all') {
        const tableDistribute = await employeeChartService.tableDistribute(shopId);
        set(() => ({ tableDistribute }));
      } else {
        const tableDistribute = {
          statuses: ['Trống', 'Đặt trước', 'Đang ngồi'],
          amount: [0, 0, 0]
        };
        const shopList = await employeeGeneralService.getShops();

        for (const shop of shopList) {
          const tableDistributeOfShop = await employeeChartService.tableDistribute(shop.id);
          tableDistribute.amount[0] += tableDistributeOfShop.amount[0];
          tableDistribute.amount[1] += tableDistributeOfShop.amount[1];
          tableDistribute.amount[2] += tableDistributeOfShop.amount[2];
        }
        set(() => ({ tableDistribute: tableDistribute }));
      }
    } catch (err) {
      toast.error(GET_GENDER_DISTRIBUTE_FAIL);
      toast.clearWaitingQueue();
    }
  }
}));
