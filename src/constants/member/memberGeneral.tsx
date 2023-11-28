import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { HandThumbUpIcon, HandThumbDownIcon } from '@heroicons/react/24/solid';

export const MEMBER_ROLE_REDUCED_IN_PROJECT: ProjectMemberRole[] = [
  'Trưởng nhóm',
  'Thành viên',
  'Mentor'
];
export const MEMBER_ROLE_IN_PROJECT: ProjectMemberRole[] = [
  'Trưởng nhóm',
  'Thành viên',
  'Mentor',
  'Rời dự án'
];
export const MAX_ROLE_DESCRIPTION_LENGTH = 200;
export const MIN_WORKING_HOURS = 16;
export const MEMBER_ITEMS_PER_PAGE = 15;
export const WorkingTimeColor: Readonly<Record<number, string>> = Object.freeze({
  0: 'bg-gray-400',
  1: 'bg-gray-600',
  2: 'bg-green-400',
  3: 'bg-green-600',
  4: 'bg-green-800',
  5: 'bg-amber-200',
  6: 'bg-amber-400',
  7: 'bg-red-900'
});

export const MEMBER_STANDARD_ICON: { [standard: string]: React.ReactElement } = {
  QUALIFIED: <HandThumbUpIcon className='w-5 h-5' />,
  UNQUALIFIED: <HandThumbDownIcon className='w-5 h-5' />,
  WARNING: <ExclamationTriangleIcon strokeWidth={2} className='w-5 h-5' />,
  NONE: <></>
};

export const MEMBER_STANDARD_COLOR = Object.freeze({
  QUALIFIED: 'green',
  UNQUALIFIED: 'red',
  WARNING: 'amber',
  NONE: 'gray'
});

export const MEMBER_STATUS: MemberStatus[] = ['ACTIVE', 'FORMER', 'SENIOR'];
export const MEMBER_ROLE: MemberRole[] = [
  'EngineerCollaborator',
  'EngineerMember',
  'ResearchCollaborator',
  'ResearchMember',
  'OperationsAssistant'
];

export const MEMBER_STATUS_COLOR: { [status: string]: Color } = {
  ACTIVE: 'green',
  SENIOR: 'blue',
  FORMER: 'amber'
};

export const MEMBER_HEADERS = Object.freeze([
  'Tên',
  'Ngành học',
  'Vai trò',
  'Chuẩn thành viên',
  'Ngày tham gia',
  'Chuyên môn'
]);
