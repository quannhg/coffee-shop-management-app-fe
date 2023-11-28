import { server, invoke } from '@services';

export const projectSearchService = {
  search: (payload: ProjectSearchParam) =>
    invoke<ListProject[]>(server.post('/api/projects/names-list', payload))
};
