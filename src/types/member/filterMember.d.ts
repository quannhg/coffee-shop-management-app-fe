type FilterMemberStore = {
  status: MemberStatus[];
  roles: MemberRole[];
  standard: MemberStandard[];
  selectStatus: (status: MemberStatus) => void;
  selectRoles: (roles: MemberRole) => void;
  selectStandard: (standard: MemberStandard) => void;
};
