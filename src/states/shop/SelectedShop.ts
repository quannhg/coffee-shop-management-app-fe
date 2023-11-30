import { create } from 'zustand';
import { employeeGeneralService } from '@services';
import { toast } from 'react-toastify';

const GET_SHOPS_FAIL = 'Không thể tải dữ liệu cửa hàng';

export const useSelectShopStore = create<SelectShopStore>()((set) => ({
  shops: [],
  selectedShop: 'all',
  selectShop: (shop) => {
    set({ selectedShop: shop });
  },
  getShops: async () => {
    try {
      const shopList = await employeeGeneralService.getShops();
      set(() => ({ shops: shopList, storeStatus: 'SUCCESS' }));
    } catch (err) {
      toast.error(GET_SHOPS_FAIL);
    }
  }
}));
