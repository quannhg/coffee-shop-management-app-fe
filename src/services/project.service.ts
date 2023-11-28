import { apiClient } from './common';

async function getAll() {
  const { data, error } = await apiClient.GET('/api/projects');
  if (data) return data;
  throw error;
}

export const projectService = {
  getAll
};
