import { invoke, server } from '@services';

export const memberDetailService = {
  getById: (memberId: string) =>
    invoke<MemberDetail>(server.get(`/api/members/${memberId}/information`)),
  getParticipantProject: (memberId: string) =>
    invoke<ParticipateProject[]>(server.get(`/api/members/${memberId}/projects`))
};
