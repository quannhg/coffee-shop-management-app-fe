import { invoke, server } from '@services';

export const itemGeneralService = {
  query: (shopId: string) => invoke<Item[]>(server.get(`/api/shops/${shopId}/items`))
};
