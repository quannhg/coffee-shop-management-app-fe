type DocumentContentInfo = {
  name: string;
  lastUpdate: string;
  version: string;
};

type DocumentContent = {
  new: DocumentContentInfo[];
  old: DocumentContentInfo[];
};

type DocumentInfo = {
  index: number;
  name: string;
  description: string;
  icon: React.ReactElement;
  content: DocumentContent;
};

type GeneralProjectMaterialList = GeneralProjectMaterial[];

type GeneralProjectMaterial = {
  name: string;
};

type ProjectMaterialParams = {
  name: string;
  description: string;
};

type GeneralProjectMaterialStore = {
  statusGeneral: StoreStatus;
  materials: GeneralProjectMaterialList;
  getMaterials: () => Promise<void>;
  createMaterial: (params: ProjectMaterialParams) => Promise<void>;
  removeMaterial: (name: string) => Promise<void>;
};
