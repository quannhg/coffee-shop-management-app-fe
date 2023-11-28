import { invoke, server } from '@services';

export const memberStandardService = {
  getTimeStandard: (memberId: string) =>
    invoke<MemberTimeStandard>(server.get(`/api/members/${memberId}/standard/time`)),
  getProjectStandard: (memberId: string) =>
    invoke<MemberProjectStandard>(server.get(`/api/members/${memberId}/standard/projects`)),
  getGPAStandard: (memberId: string) =>
    invoke<MemberGPAStandard>(server.get(`/api/members/${memberId}/standard/gpa`))
};
