type PersonnelBoxInfo = {
  id: string;
  index: number;
  name: string;
  role: ProjectMemberRole;
  description: string;
  avatarUrl: string;
  status: WorkingStatus;
};

type NumberOfRole = {
  total: number;
  leader: number;
  member: number;
  mentor: number;
  leaved: number;
};

type PersonnelProject = {
  id: string;
  name: string;
  department: Department;
  role: ProjectMemberRole;
  description: string;
  avatarUrl: string;
};

type PersonnelProjectGeneral = {
  metadata: NumberOfRole;
  data: PersonnelProject[];
};

type PersonnelProjectDetailParams = {
  userId: string;
  role: ProjectMemberRole | '';
  description: string;
};

type PersonnelProjectGeneralStore = {
  statusPersonnel: StoreStatus;
  personnelList: PersonnelProjectGeneral;
  getPersonnelProject: (projectId: string) => Promise<void>;
  createPersonnelProject: (
    projectId: string,
    payload: PersonnelProjectDetailParams
  ) => Promise<void>;
  updatePersonnelProject: (
    projectId: string,
    payload: PersonnelProjectDetailParams
  ) => Promise<void>;
  markLeavingProject: (projectId: string, userId: string) => Promise<void>;
  removePersonnelProject: (projectId: string, userId: string) => Promise<void>;
};
