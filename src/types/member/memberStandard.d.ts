type StandardStatus = 'PASS' | 'WARNING' | 'FAILED' | 'NONE';

type HoursOneYear = {
  week: number;
  hours: number;
  hoursLevel: number;
  from: number;
  to: number;
};

type MemberTimeStandard = {
  hours: number;
  hoursAverageOneYear: number;
  hoursStandardPerWeek: number;
  hoursOneYear: HoursOneYear[];
  currentYear: number;
  currentWeek: number;
  standardStatus: StandardStatus;
  standard: MemberStandard;
  currentSemester: string;
  violatedTime?: number;
};

type ProjectStandardType = {
  PROPOSAL: number;
  ONGOING: number;
  COMPLETED: number;
  DELAY: number;
  CANCELED: number;
};

type MemberProjectStandard = {
  projectStandardSetting: ProjectStandardType;
  timeAverageProjectCompletion: string;
  totalProject: number;
  projectStandardNumber: ProjectStandardType;
  standardProjects: StandardStatus;
  violatedTime?: number;
};

type GPAData = {
  semester: string;
  mark: number;
};

type MemberGPAStandard = {
  gpaStandardSetting: {
    format: number;
    gpa: number;
  };
  gpaData: GPAData[];
  gpaTwoRecentSemester: GPAData[];
  joinedDate: number;
  gpaStandard: StandardStatus;
  violatedTime?: number;
};

type MemberStandardStore = {
  statusMemberStandard: StoreStatus;
  memberTimeStandard: MemberTimeStandard;
  memberProjectStandard: MemberProjectStandard;
  memberGPAStandard: MemberGPAStandard;
  getTimeStandard: (memberId: string) => Promise<void>;
  getProjectStandard: (memberId: string) => Promise<void>;
  getGPAStandard: (memberId: string) => Promise<void>;
};
