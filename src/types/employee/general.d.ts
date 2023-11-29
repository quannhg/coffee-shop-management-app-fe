type CreateEmployeeDto = {
  name: string;
  avatarUrl: string;
  address: string;
  gender: Gender;
  birthday: number;
  phoneNum: string;
  bankNum: string;
  academicLevel: AcademicStandard;
  joinedAt: number;
  role: Role;
};

type Employee = {
  id: string;
  name: string;
  avatarUrl?: string;
  role: Role;
  joinedAt: number;
  birthday: number;
  gender: Gender;
  phoneNum: string;
};

type OrderType = 'ASC' | 'DESC';

type EmployeeOrder = {
  name: OrderType;
  role: OrderType;
  joinedAt: OrderType;
  birthday: OrderType;
  gender: OrderType;
};

type EmployeeOrderKey = keyof EmployeeOrder;

type EmployeeFilter = {
  role: Role[];
  gender: Gender[];
};

type EmployeeForSearch = {
  id: string;
  name: string;
};

type EmployeeListStore = {
  storeStatus: StoreStatus;
  employeeList: Employee[];
  employeeOrder: EmployeeOrder;
  employeeFilter: EmployeeFilter;
  setOrder: (employeeOrder: EmployeeOrder) => void;
  setFilter: (employeeFilter: EmployeeFilter) => void;
  getEmployeeList: () => Promise<void>;
  createEmployee: (employee: CreateEmployeeDto) => Promise<void>;
};

type SearchEmployeeListStore = {
  employeeListForSearch: EmployeeForSearch[];
  getEmployeeListForSearch: (keyword: string) => Promise<void>;
};
