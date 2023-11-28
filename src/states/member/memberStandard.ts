import { create } from 'zustand';
import { memberStandardService } from '@services';

export const useOldMemberStandardStore = create<MemberStandardStore>()((set) => ({
  statusMemberStandard: 'UNINIT',
  memberTimeStandard: {
    hours: 0,
    hoursAverageOneYear: 0,
    hoursStandardPerWeek: 0,
    hoursOneYear: [],
    currentYear: 0,
    currentWeek: 0,
    standardStatus: 'PASS',
    standard: 'QUALIFIED',
    currentSemester: '',
    violatedTime: 0
  },
  memberProjectStandard: {
    projectStandardSetting: {
      PROPOSAL: 0,
      ONGOING: 0,
      COMPLETED: 0,
      DELAY: 0,
      CANCELED: 0
    },
    timeAverageProjectCompletion: '',
    totalProject: 0,
    projectStandardNumber: {
      PROPOSAL: 0,
      ONGOING: 0,
      COMPLETED: 0,
      DELAY: 0,
      CANCELED: 0
    },
    standardProjects: 'PASS',
    violatedTime: 0
  },
  memberGPAStandard: {
    gpaStandardSetting: {
      format: 0,
      gpa: 0
    },
    gpaData: [],
    gpaTwoRecentSemester: [],
    joinedDate: 0,
    gpaStandard: 'PASS',
    violatedTime: 0
  },
  getTimeStandard: async (memberId) => {
    set(() => ({ statusMemberStandard: 'PENDING' }));
    try {
      const memberTimeStandard = await memberStandardService.getTimeStandard(memberId);
      set(() => ({ statusMemberStandard: 'SUCCESS', memberTimeStandard: memberTimeStandard }));
    } catch (err) {
      set(() => ({ statusMemberStandard: 'REJECT' }));
    }
  },
  getProjectStandard: async (memberId) => {
    set(() => ({ statusMemberStandard: 'PENDING' }));
    try {
      const memberProjectStandard = await memberStandardService.getProjectStandard(memberId);
      set(() => ({
        statusMemberStandard: 'SUCCESS',
        memberProjectStandard: memberProjectStandard
      }));
    } catch (err) {
      set(() => ({ statusMemberStandard: 'REJECT' }));
    }
  },
  getGPAStandard: async (memberId) => {
    set(() => ({ statusMemberStandard: 'PENDING' }));
    try {
      const memberGPAStandard = await memberStandardService.getGPAStandard(memberId);
      set(() => ({ statusMemberStandard: 'SUCCESS', memberGPAStandard: memberGPAStandard }));
    } catch (err) {
      set(() => ({ statusMemberStandard: 'REJECT' }));
    }
  }
}));
