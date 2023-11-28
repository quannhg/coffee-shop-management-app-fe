type FilterProjectStore = {
  status: ProjectStatus[];
  timeInterval: string;
  selectStatus: (status: ProjectStatus) => void;
  selectTimeInterval: (timeInterval: string) => void;
  removeStatus: () => void;
};
