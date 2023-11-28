import { create } from 'zustand';
import { TOAST_PENDING } from '@constants';
import { projectDetailMaterialService, projectDocumentService } from '@services';
import { toast } from 'react-toastify';

export const useDetailProjectMaterialsStore = create<DetailProjectMaterialStore>()((set, get) => ({
  statusDetail: 'UNINIT',
  material: {
    id: '',
    projectId: '',
    documents: [
      {
        id: '1',
        projectId: 'projectId1',
        materialId: 'materialId1',
        name: 'name1',
        createDay: 13112342,
        url: 'url1'
      },
      {
        id: '2',
        projectId: 'projectId2',
        materialId: 'materialId2',
        name: 'name2',
        createDay: 13112342,
        url: 'url2'
      },
      {
        id: '3',
        projectId: 'projectId3',
        materialId: 'materialId3',
        name: 'name3',
        createDay: 13112342,
        url: 'url3'
      }
    ]
  },
  getMaterial: async () => {
    set(() => ({ statusDetail: 'PENDING' }));
    try {
      const materials = await projectDetailMaterialService.get();
      set(() => ({ materials: materials, statusDetail: 'SUCCESS' }));
    } catch (err) {
      set(() => ({ statusDetail: 'REJECT' }));
    }
  },
  editMaterial: async (params) => {
    set(() => ({ statusDetail: 'PENDING' }));
    const id = toast.loading(TOAST_PENDING);
    toast.clearWaitingQueue();
    try {
      await projectDetailMaterialService.edit(params);
      await get().getMaterial();
      set(() => ({ statusDetail: 'SUCCESS' }));
      toast.update(id, {
        render: `Material ${params.name} is edit successfully`,
        type: 'success',
        isLoading: false,
        autoClose: 2000
      });
    } catch (err) {
      set(() => ({ statusDetail: 'REJECT' }));
      toast.update(id, {
        render: `Material ${params.name} is edit failure`,
        type: 'error',
        isLoading: false,
        autoClose: 2000
      });
    }
  },
  addDocument: async (params) => {
    set(() => ({ statusDetail: 'PENDING' }));
    const id = toast.loading(TOAST_PENDING);
    toast.clearWaitingQueue();
    try {
      const { id: materialId, projectId } = get().material;
      await projectDocumentService.edit(projectId, materialId, params);
      await get().getMaterial();
      set(() => ({ statusDetail: 'SUCCESS' }));
      toast.update(id, {
        render: `Document ${params.name} is added successfully`,
        type: 'success',
        isLoading: false,
        autoClose: 2000
      });
    } catch (err) {
      set(() => ({ statusDetail: 'REJECT' }));
      toast.update(id, {
        render: `Document ${params.name} is added failure`,
        type: 'error',
        isLoading: false,
        autoClose: 2000
      });
    }
  },
  editDocument: async (params) => {
    set(() => ({ statusDetail: 'PENDING' }));
    const id = toast.loading(TOAST_PENDING);
    toast.clearWaitingQueue();
    try {
      const { id: materialId, projectId } = get().material;
      await projectDocumentService.edit(projectId, materialId, params);
      await get().getMaterial();
      set(() => ({ statusDetail: 'SUCCESS' }));
      toast.update(id, {
        render: `Document ${params.name} is edit successfully`,
        type: 'success',
        isLoading: false,
        autoClose: 2000
      });
    } catch (err) {
      set(() => ({ statusDetail: 'REJECT' }));
      toast.update(id, {
        render: `Document ${params.name} is edit failure`,
        type: 'error',
        isLoading: false,
        autoClose: 2000
      });
    }
  },
  removeDocument: async (documentId) => {
    set(() => ({ statusDetail: 'PENDING' }));
    const id = toast.loading(TOAST_PENDING);
    toast.clearWaitingQueue();
    try {
      const { id: materialId, projectId } = get().material;
      const document = get().material.documents.find((document) => (document.id = documentId));
      const documentName = document?.name;
      await projectDocumentService.remove(projectId, materialId, documentId);
      await get().getMaterial();
      set(() => ({ statusDetail: 'SUCCESS' }));
      toast.update(id, {
        render: `Document ${documentName} is edit successfully`,
        type: 'success',
        isLoading: false,
        autoClose: 2000
      });
    } catch (err) {
      set(() => ({ statusDetail: 'REJECT' }));
      const document = get().material.documents.find((document) => (document.id = documentId));
      const documentName = document?.name;
      toast.update(id, {
        render: `Document ${documentName} is edit failure`,
        type: 'error',
        isLoading: false,
        autoClose: 2000
      });
    }
  }
}));
