type MemberListStore = {
  memberList: MemberId[];
  getMemberList: () => Promise<void>;
};
