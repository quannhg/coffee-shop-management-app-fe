type EmployeeDetail = {
  id: string;
  name: string;
  avatarUrl: string;
  address: string;
  gender: 'nam' | 'nữ';
  birthday: number;
  phoneNum: string;
  bankNum: string;
  academicLevel: AcademicStandard;
  joinedAt: number;
  leaveAt: number;
  role: Role;
};

type DetailEmployeeStore = {
  member?: EmployeeDetail;
  getMember: (id: string) => Promise<void>;
};
