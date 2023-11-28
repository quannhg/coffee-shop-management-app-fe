type GPA = {
  semester: string;
  mark: number;
};

type MemberDetail = {
  name: string;
  avatarUrl: string;
  status: MemberStatus;
  job: MemberRole | '';
  github: string;
  eduMail: string;
  phoneNum: string;
  major: string;
  uniYear: string;
  joinedDate: number;
  leavedDate: number;
  gpa: GPA[];
};

type MemberDetailStore = {
  statusMemberDetail: StoreStatus;
  memberDetail: MemberDetail;
  mobileTabView: string;
  setMobileTabView: (tabView: string) => void;
  getMemberById: (memberId: string) => Promise<void>;
};
