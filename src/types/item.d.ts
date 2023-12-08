type Item = {
  id: string;
  name: string;
  avatarUrl: string;
  price: string;
  status: 'ready';
};

type ItemsListStore = {
  storeStatus: StoreStatus;
  itemList: Item[];
  getItemList: (shopId: string) => Promise<void>;
};
