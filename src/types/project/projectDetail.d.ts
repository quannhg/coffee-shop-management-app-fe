type ProjectDetail = {
  id: string;
  name: string;
  productType: string[];
  description: string;
  status: ProjectStatus;
  startDate: number;
  endDate: number;
  avatarUrl: string;
};

type ProjectEditParams = {
  name: string;
  status: string;
  productType: string[];
  description: string;
  avatarUrl: string;
};

type ProjectDetailStore = {
  statusDetail: StoreStatus;
  projectDetail: ProjectDetail;
  mobileTabView: string;
  desktopTabView: string;
  getProjectById: (projectId: string) => Promise<void>;
  updateProject: (payload: ProjectEditParams) => Promise<void>;
  removeProject: () => Promise<void>;
  updateStatus: (payload: { status: string }) => Promise<void>;
  setMobileTabView: (payload: string) => void;
  setDesktopTabView: (payload: string) => void;
};
