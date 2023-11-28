import { server, invoke } from '@services';

export const projectGeneralMaterialsService = {
  get: () => invoke<GeneralProjectMaterialList>(server.get('/api/projects/names-list')),
  create: (payload: ProjectMaterialParams) =>
    invoke<ProjectMaterialParams>(server.post('/api/projects/names-list', payload)),
  remove: (name: string) =>
    invoke<ProjectMaterialParams>(server.delete(`/api/projects/names-list/${name}`))
};
