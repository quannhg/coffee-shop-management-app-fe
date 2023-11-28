import { invoke, server } from '@services';

export const projectDetailService = {
  getById: (projectId: string) => invoke<ProjectDetail>(server.get(`/api/projects/${projectId}`)),
  update: (projectId: string, payload: ProjectEditParams) =>
    invoke<{ projectId: string }>(server.put(`/api/projects/${projectId}`, payload)),
  remove: (projectId: string) =>
    invoke<{ projectId: string }>(server.delete(`/api/projects/${projectId}`)),
  updateStatus: (projectId: string, newStatus: { status: string }) =>
    invoke<{ projectId: string }>(server.patch(`/api/projects/${projectId}`, newStatus))
};
