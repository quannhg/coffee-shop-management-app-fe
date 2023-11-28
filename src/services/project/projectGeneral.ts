import { invoke, server } from '@services';

export const projectGeneralService = {
  query: (payload: ProjectRequest) =>
    invoke<ProjectResponse>(server.post('/api/projects/query', payload)),
  create: (payload: ProjectCreationParams) =>
    invoke<ProjectCreationReturnValue>(server.post('/api/projects', payload))
};
