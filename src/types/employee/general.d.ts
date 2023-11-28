type Employee = {
  id: string;
  name: string;
  avatarUrl: string;
  role: Role;
  joinedAt: number;
  birthday: number;
  gender: 'nam' | 'nữ';
  phoneNum: string;
};

type OrderType = 'ASC' | 'DESC';

type EmployeeOrder = {
  name?: OrderType;
  role?: OrderType;
  joinedAt?: OrderType;
  birthday?: OrderType;
  gender?: OrderType;
};

type EmployeeFilter = {
  role?: Role;
  gender?: 'nam' | 'nu';
};

type EmployeeForSearch = {
  id: string;
  name: string;
};

type EmployeeListStore = {
  storeStatus: StoreStatus;
  memberList: Employee[];
  employeeOrder: EmployeeOrder;
  employeeFilter: EmployeeFilter;
  setOrder: (employeeOrder: EmployeeOrder) => void;
  setFilter: (employeeFilter: EmployeeFilter) => void;
  getMemberList: () => Promise<void>;
};

type SearchEmployeeListStore = {
  employeeListForSearch: EmployeeForSearch[];
  getEmployeeListForSearch: (keyword: string) => Promise<void>;
};
