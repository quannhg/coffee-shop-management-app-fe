import { create } from 'zustand';

export const useFilterMemberStore = create<FilterMemberStore>()((set) => ({
  status: [],
  roles: [],
  standard: [],
  selectStatus: (status) => {
    set((state) => {
      const newStatus = [...state.status];
      const idx = newStatus.findIndex((item) => item === status);
      if (idx !== -1) {
        newStatus.splice(idx, 1);
        return { status: newStatus };
      } else {
        const resultStatus = [...state.status, status];
        return { status: resultStatus };
      }
    });
  },
  selectRoles: (roles) => {
    set((state) => {
      const newRoles = [...state.roles];
      const idx = newRoles.findIndex((item) => item === roles);
      if (idx !== -1) {
        newRoles.splice(idx, 1);
        return { roles: newRoles };
      } else {
        const resultRoles = [...state.roles, roles];
        return { roles: resultRoles };
      }
    });
  },
  selectStandard: (standard) => {
    set((state) => {
      const newStandard = [...state.standard];
      const idx = newStandard.findIndex((item) => item === standard);
      if (idx !== -1) {
        newStandard.splice(idx, 1);
        return { standard: newStandard };
      } else {
        const resultStandard = [...state.standard, standard];
        return { standard: resultStandard };
      }
    });
  }
}));
