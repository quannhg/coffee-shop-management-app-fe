import { apiClient } from './common';

async function getInfo() {
  const { data, error } = await apiClient.GET('/api/user');
  if (data) return data;
  throw error;
}

export const userService = {
  getInfo
};
