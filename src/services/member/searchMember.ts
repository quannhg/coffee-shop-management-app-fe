import { server, invoke } from '@services';

export const memberSearchService = {
  searchByName: (name: string) =>
    invoke<SearchMember[]>(server.get(`/api/members/names-list?name=${name}`))
};
