import { create } from 'zustand';

export const useSearchMember = create<SearchMemberStore>((set) => ({
  currentInputValue: '',
  setCurrentInputValue(memberName) {
    set(() => ({ currentInputValue: memberName }));
  },
  resetCurrentInputValue() {
    set(() => ({ currentInputValue: '' }));
  }
}));
