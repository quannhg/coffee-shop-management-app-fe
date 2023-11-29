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

type DetailEmployeeStore = {
  member?: EmployeeDetail;
  getMember: (id: string) => Promise<void>;
  updateMember: (id: string, employee: EmployeeDetail) => Promise<void>;
  removeMember: (id: string) => Promise<void>;
};
