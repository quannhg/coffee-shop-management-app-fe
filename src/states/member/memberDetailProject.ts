import { create } from 'zustand';
import { memberDetailService } from '@services';

export const useMemberDetailProjectStore = create<DetailMemberProjectStore>()((set) => ({
  statusDetailMemberProject: 'UNINIT',
  participateProjects: [],
  getParticipateProject: async (memberId: string) => {
    set(() => ({ statusDetailMemberProject: 'PENDING' }));
    try {
      const participateProject = await memberDetailService.getParticipantProject(memberId);
      set(() => ({
        statusDetailMemberProject: 'SUCCESS',
        participateProjects: participateProject
      }));
    } catch (err) {
      set(() => ({ statusDetailMemberProject: 'REJECT' }));
    }
  }
}));
