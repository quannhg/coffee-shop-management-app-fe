import { create } from 'zustand';

type UserStore = {
  data: UserInfo | null; // Null if user not authorized
  updateUserInfo: (data: UserInfo) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  data: null,
  updateUserInfo: (data: UserInfo) => set({ data })
}));
