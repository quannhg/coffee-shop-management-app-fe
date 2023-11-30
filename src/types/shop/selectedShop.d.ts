type ShopForSelect = {
  id: string;
  name: string;
};

type SelectShopStore = {
  shops: ShopForSelect[];
  selectedShop: ShopForSelect | 'all';
  getShops: () => Promise<void>;
  selectShop: (shop: ShopForSelect | 'all') => void;
};
