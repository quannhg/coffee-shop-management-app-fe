import { server, invoke } from '@services';

export const projectDetailMaterialService = {
  get: () => invoke<DetailProjectMaterial>(server.get('/api/projects/names-list')),
  edit: (payload: ProjectMaterialParams) =>
    invoke<ProjectMaterialParams>(server.post('/api/projects/names-list', payload))
};
