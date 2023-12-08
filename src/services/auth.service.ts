import { apiClient } from './common';

async function login(body: { username: string; password: string }) {
  const { data, error } = await apiClient.POST('/auth/login', { body });
  if (data) return data;
  throw error;
}

async function logout() {
  const { error } = await apiClient.DELETE('/auth/logout');
  if (error) throw error;
}

export const authService = {
  login,
  logout
};
