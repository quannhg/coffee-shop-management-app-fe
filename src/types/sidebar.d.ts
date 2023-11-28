type SidebarStore = {
  typeNavbar: string;
  openSidebar: boolean;
  showToggleSidebarBtn: boolean;
  collapseSidebar: boolean;
  setTypeNavbar: (payload: string) => void;
  setToggleSidebarBtn: (toggleSidebar: boolean) => void;
  setOpenSidebar: (payload: boolean) => void;
  setCollapseSidebar: (payload: boolean) => void;
};
