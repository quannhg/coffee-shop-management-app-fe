import { create } from 'zustand';
import { TOAST_PENDING } from '@constants';
import { itemGeneralService } from '@services';
import { toast } from 'react-toastify';

const GET_ITEM_FAIL = 'Không thể tải dữ liệu món ăn';

export const useItemListStore = create<ItemsListStore>()((set) => ({
  storeStatus: 'UNINIT',
  itemList: [],
  getItemList: async (shopId) => {
    set(() => ({ storeStatus: 'PENDING' }));
    const id = toast.loading(TOAST_PENDING);
    toast.clearWaitingQueue();
    try {
      const itemList = await itemGeneralService.query(shopId);
      set(() => ({ itemList, storeStatus: 'SUCCESS' }));
      toast.done(id);
    } catch (err) {
      set(() => ({ storeStatus: 'REJECT' }));
      toast.update(id, {
        render: GET_ITEM_FAIL,
        type: 'error',
        isLoading: false,
        autoClose: 2000
      });
    }
  }
}));
