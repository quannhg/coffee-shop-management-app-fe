type ProjectDocument = {
  id: string;
  projectId: string;
  materialId: string;
  name: string;
  createDay: number;
  url: string;
};

type ProjectDocumentParams = {
  id?: string;
  name: string;
  url: string;
};

type DetailProjectMaterial = {
  id: string;
  projectId: string;
  documents: ProjectDocument[];
};

type DetailProjectMaterialStore = {
  statusDetail: StoreStatus;
  material: DetailProjectMaterial;
  getMaterial: () => Promise<void>;
  editMaterial: (params: ProjectMaterialParams) => Promise<void>;
  addDocument: (params: ProjectDocumentParams) => Promise<void>;
  editDocument: (params: ProjectDocumentParams) => Promise<void>;
  removeDocument: (id: string) => Promise<void>;
};
