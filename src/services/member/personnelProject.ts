import { invoke, server } from '@services';

export const personnelProjectGeneralService = {
  getPersonnel: (projectId: string) =>
    invoke<PersonnelProjectGeneral>(server.get(`/api/projects/${projectId}/members`)),
  createPersonnel: (projectId: string, payload: PersonnelProjectDetailParams) =>
    invoke<{ projectId: string }>(server.post(`/api/projects/${projectId}/members`, payload)),
  updatePersonnel: (projectId: string, payload: PersonnelProjectDetailParams) =>
    invoke<{ projectId: string }>(server.put(`/api/projects/${projectId}/members`, payload)),
  markLeaving: (projectId: string, userId: string) =>
    invoke<{ projectId: string }>(server.patch(`/api/projects/${projectId}/members/${userId}`)),
  removePersonnel: (projectId: string, userId: string) =>
    invoke<{ projectId: string }>(server.delete(`/api/projects/${projectId}/members/${userId}`))
};
