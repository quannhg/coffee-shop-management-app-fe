export const StatusColor = Object.freeze({
  ACTIVE: 'green',
  INACTIVE: 'gray'
});
export const QualificationColor: Readonly<Record<Qualification, Color>> = Object.freeze({
  PASSED: 'green',
  FAILED: 'red',
  NO_DATA: 'gray',
  WARNING: 'amber',
  BYPASS: 'green'
});
export const RoleColor: Readonly<Record<Role, Color>> = Object.freeze({
  'quản lý': 'green',
  'bồi bàn': 'gray',
  'pha chế': 'amber',
});
