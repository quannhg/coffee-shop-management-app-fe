type ProjectSort = {
  status: Sort;
  startDate: Sort;
};

type Avatar = {
  name: string;
  imgURL: string | null;
};

type ProjectSummary = {
  id: string;
  name: string;
  productType: string[];
  description: string;
  status: string;
  startDate: number;
  endDate: number;
  member: Avatar[];
};

type ProjectRequest = {
  name?: string[];
  status?: ProjectStatus[];
  sort: ProjectSort;
  pageSize: number;
  pageNumber: number;
  fromTime?: number;
  toTime?: number;
};

type ProjectResponse = {
  pageNumber: number;
  pageNumberMax: number;
  pageSize: number;
  totalProjects: number;
  projects: ProjectSummary[];
};

type ProjectCreationParams = {
  name: string;
  status: string;
  memberId: string;
};

type ProjectCreationReturnValue = {
  projectId: string;
};

type ProjectGeneralStore = {
  statusGeneral: StoreStatus;
  projectGeneral: ProjectResponse;
  activePage: number;
  inputPage: string;
  setActivePage: (payload: number) => void;
  setInputPage: (payload: string) => void;
  queryProject: (payload: ProjectRequest) => Promise<void>;
  createProject: (payload: ProjectCreationParams, projectParam: ProjectRequest) => Promise<void>;
};
