type EmployeeDetail = {
  id: string;
  name: string;
  avatarUrl: string;
  address: string;
  gender: Gender;
  birthday: number;
  phoneNum: string;
  bankNum: string;
  academicLevel: AcademicStandard;
  joinedAt: number;
  leaveAt?: number;
  role: Role;
};

type EditEmployeeDetail = {
  id: string;
  name: string;
  avatarUrl: string;
  address: string;
  gender: Gender;
  birthday: number;
  phoneNum: string;
  bankNum: string;
  academicLevel: AcademicStandard;
};

type DetailEmployeeStore = {
  member?: EmployeeDetail;
  getMember: (id: string) => Promise<void>;
  updateMember: (id: string, employee: EditEmployeeDetail) => Promise<void>;
  removeMember: (id: string) => Promise<void>;
};
