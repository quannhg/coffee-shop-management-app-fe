import { create } from 'zustand';

export const useSidebarStore = create<SidebarStore>((set) => ({
  typeNavbar: '',
  openSidebar: true,
  showToggleSidebarBtn: true,
  collapseSidebar: true,
  setTypeNavbar: (payload) => {
    set(() => ({ typeNavbar: payload }));
  },
  setToggleSidebarBtn: (toggleSidebar) => {
    set(() => ({ showToggleSidebarBtn: toggleSidebar }));
  },
  setOpenSidebar: (payload) => {
    set(() => ({ openSidebar: payload }));
  },
  setCollapseSidebar: (payload) => {
    set(() => ({ collapseSidebar: payload }));
  }
}));
