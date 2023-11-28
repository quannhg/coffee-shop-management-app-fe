import { create } from 'zustand';
import { memberDetailService } from '@services';
import { MEMBER_DETAIL_MOBILE_TAB } from '@constants';

export const useMemberDetailStore = create<MemberDetailStore>()((set) => ({
  statusMemberDetail: 'UNINIT',
  memberDetail: {
    name: '',
    avatarUrl: '',
    status: 'ACTIVE',
    job: '',
    github: '',
    eduMail: '',
    phoneNum: '',
    major: '',
    uniYear: '',
    joinedDate: 0,
    leavedDate: 0,
    gpa: []
  },
  mobileTabView: MEMBER_DETAIL_MOBILE_TAB[0],
  setMobileTabView: (tabView) => {
    set(() => ({ mobileTabView: tabView }));
  },
  getMemberById: async (memberId) => {
    set(() => ({ statusMemberDetail: 'PENDING' }));
    try {
      const memberDetail = await memberDetailService.getById(memberId);
      set(() => ({ statusMemberDetail: 'SUCCESS', memberDetail: memberDetail }));
    } catch (err) {
      set(() => ({ statusMemberDetail: 'REJECT' }));
    }
  }
}));
