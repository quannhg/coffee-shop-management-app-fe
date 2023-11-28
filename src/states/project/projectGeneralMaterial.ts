import { create } from 'zustand';
import { TOAST_PENDING } from '@constants';
import { projectGeneralMaterialsService } from '@services';
import { toast } from 'react-toastify';

export const useGeneralProjectMaterialsStore = create<GeneralProjectMaterialStore>()(
  (set, get) => ({
    statusGeneral: 'UNINIT',
    materials: [],
    getMaterials: async () => {
      set(() => ({ statusGeneral: 'PENDING' }));
      try {
        const materials = await projectGeneralMaterialsService.get();
        set(() => ({ materials: materials, statusGeneral: 'SUCCESS' }));
      } catch (err) {
        set(() => ({ statusGeneral: 'REJECT' }));
      }
    },
    createMaterial: async (params) => {
      set(() => ({ statusGeneral: 'PENDING' }));
      const id = toast.loading(TOAST_PENDING);
      toast.clearWaitingQueue();
      try {
        await projectGeneralMaterialsService.create(params);
        await get().getMaterials();
        set(() => ({ statusGeneral: 'SUCCESS' }));
        toast.update(id, {
          render: `Material ${params.name} is added successfully`,
          type: 'success',
          isLoading: false,
          autoClose: 2000
        });
      } catch (err) {
        set(() => ({ statusGeneral: 'REJECT' }));
        toast.update(id, {
          render: `Material ${params.name} is added failure`,
          type: 'error',
          isLoading: false,
          autoClose: 2000
        });
      }
    },
    removeMaterial: async (name) => {
      set(() => ({ statusGeneral: 'PENDING' }));
      const id = toast.loading(TOAST_PENDING);
      toast.clearWaitingQueue();
      try {
        await projectGeneralMaterialsService.remove(name);
        await get().getMaterials();
        set(() => ({ statusGeneral: 'SUCCESS' }));
        toast.update(id, {
          render: `Material ${name} is remove successfully`,
          type: 'success',
          isLoading: false,
          autoClose: 2000
        });
      } catch (err) {
        set(() => ({ statusGeneral: 'REJECT' }));
        toast.update(id, {
          render: `Material ${name} is remove failure`,
          type: 'error',
          isLoading: false,
          autoClose: 2000
        });
      }
    }
  })
);
