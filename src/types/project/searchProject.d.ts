type ProjectSearchParam = {
  name: string;
  status?: ProjectStatus[];
  fromTime?: number;
  toTime?: number;
};

type ListProject = {
  id: string;
  name: string;
};

type ProjectSearchStore = {
  listProject: ListProject[];
  setListProject: (payload: ListProject[]) => void;
};
