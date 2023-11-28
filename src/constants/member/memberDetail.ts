export const MEMBER_STANDARDS_TYPE = {
  time: 'time',
  project: 'project',
  gpa: 'gpa'
};

export const MEMBER_STANDARD_STATUS = {
  pass: 'PASS',
  failed: 'FAILED',
  warning: 'WARNING',
  none: 'NONE'
};

export const BACKGROUND_STANDARD_HEADER_COLOR: { [status: string]: string } = {
  PASS: ' bg-teal-500 bg-opacity-20',
  FAILED: ' bg-red-500 bg-opacity-20',
  WARNING: ' bg-amber-500 bg-opacity-20',
  NONE: ' bg-gray-500 bg-opacity-20'
};

export const MEMBER_DETAIL_MOBILE_TAB = ['Thông tin', 'Dự án', 'Hoạt động'];

export const WORKING_STATUS_COLOR: Record<string, string> = {
  working: 'green',
  completed: 'purple',
  quit: 'red',
  stopped: 'red'
};
