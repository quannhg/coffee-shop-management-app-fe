import { Select, Option } from '@material-tailwind/react';
import { useSelectShopStore } from '@states';
import { useEffect } from 'react';

export const SelectShop = () => {
  const { selectedShop, getShops, selectShop } = useSelectShopStore();
  useEffect(() => {
    getShops();
  }, [getShops]);
  const shops = [
    { name: 'Jangnam', id: 'jnId' },
    { name: 'Coffin', id: 'cfId' },
    { name: 'Six', id: 'sId' }
  ];

  const handleSelectShop = (shopId: string | 'all') => {
    if (shopId !== 'all') selectShop(shops[shops.findIndex((shop) => shop.id === shopId)]);
    else selectShop('all');
  };

  const allShops = [...shops, { name: 'Tất cả', id: 'all' }];

  return (
    <Select
      onChange={(value) => handleSelectShop(value || 'all')}
      label='Cửa hàng'
      variant='standard'
      value={selectedShop === 'all' ? 'all' : selectedShop.id}
    >
      {allShops.map((shop, idx) => (
        <Option key={idx} value={shop.id}>
          {shop.name}
        </Option>
      ))}
    </Select>
  );
};
