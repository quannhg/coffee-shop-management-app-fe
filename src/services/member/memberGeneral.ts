import { invoke, server } from '@services';

export const memberGeneralService = {
  query: (payload: MemberRequest) =>
    invoke<MemberResponse>(server.post('/api/members/general', payload)),
  create: (payload: MemberCreationParams) => invoke<string>(server.post('/api/members', payload))
};
