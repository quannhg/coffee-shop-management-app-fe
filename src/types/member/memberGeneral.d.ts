type MemberStatus = 'ACTIVE' | 'FORMER' | 'SENIOR';

type MemberRole =
  | 'EngineerMember'
  | 'EngineerCollaborator'
  | 'ResearchMember'
  | 'ResearchCollaborator'
  | 'OperationsAssistant';

type MemberStandard = 'QUALIFIED' | 'UNQUALIFIED' | 'WARNING' | 'NONE';

type MemberSummary = {
  id: string;
  name: string;
  avatarUrl: string;
  role: {
    status: MemberStatus;
    roles: MemberRole;
  };
  standard: MemberStandard;
  project: {
    proposals: number;
    ongoing: number;
  };
  hours: number;
};

type MemberRequest = {
  pagination: {
    page: number;
    perpage: number;
  };
  filter: {
    status: MemberStatus[];
    roles: MemberRole[];
    standard: MemberStandard[];
  };
};

type MemberResponse = {
  metadata: {
    totalPage: number;
  };
  data: MemberSummary[];
};

type MemberCreationParams = {
  name: string;
  status: MemberStatus;
  roles: MemberRole | '';
};

type MemberGeneralStore = {
  statusMemberGeneral: StoreStatus;
  memberGeneral: MemberResponse;
  setMemberGeneral: (payload: MemberResponse) => void;
  activePage: number;
  inputPage: string;
  setActivePage: (payload: number) => void;
  setInputPage: (payload: string) => void;
  queryMember: (payload: MemberRequest) => Promise<void>;
  createMember: (payload: MemberCreationParams, memberParam: MemberRequest) => Promise<void>;
};
