import { apiClient } from '@services';
import { useQuery } from '@tanstack/react-query';

const GET_USER_INFO_PATH = '/api/user';

export function useUserInfo() {
  return useQuery({
    queryKey: [GET_USER_INFO_PATH],
    queryFn: async () => {
      const { data, error } = await apiClient.GET(GET_USER_INFO_PATH);
      if (data) return data;
      throw new Error(error);
    }
  });
}
