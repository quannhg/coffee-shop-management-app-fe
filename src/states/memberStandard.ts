import { create } from 'zustand';

type MemberStandardStore = {
  standards: Record<string, Qualification>;
  setStandard: (memberId: string, standard: Qualification) => void;
};

export const useMemberStandardStore = create<MemberStandardStore>((set) => ({
  standards: {},
  setStandard: (memberId, standard) => {
    return set((state) => ({
      standards: {
        ...state.standards,
        [memberId]: standard
      }
    }));
  }
}));
