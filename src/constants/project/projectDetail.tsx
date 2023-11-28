import {
  ArrowTrendingUpIcon as ArrowTrendingUpIconSolid,
  BriefcaseIcon as BriefcaseIconSolid,
  ComputerDesktopIcon,
  DocumentTextIcon as DocumentTextIconSolid,
  FlagIcon as FlagIconSolid,
  UserGroupIcon
} from '@heroicons/react/24/solid';
import {
  ArrowTrendingUpIcon as ArrowTrendingUpIconOutline,
  BriefcaseIcon as BriefcaseIconOutline,
  DocumentTextIcon as DocumentTextIconOutline,
  FlagIcon as FlagIconOutline
} from '@heroicons/react/24/outline';

export const PROJECT_DETAIL_MOBILE_TAB = ['Thông tin', 'Nhân sự', 'Tài liệu', 'Hoạt động'];
export const PROJECT_DETAIL_DESKTOP_TAB = [
  {
    tab: 'Nhân sự',
    icon: <UserGroupIcon className='w-5 h-5' />
  },
  {
    tab: 'Hoạt động',
    icon: <ComputerDesktopIcon className='w-5 h-5' />
  }
];

export const PROJECT_DETAIL_MATERIAL_ICON = {
  solid: [
    <FlagIconSolid className='w-4 h-4' />,
    <ArrowTrendingUpIconSolid className='w-4 h4' />,
    <BriefcaseIconSolid className='w-4 h-4' />,
    <DocumentTextIconSolid className='w-4 h-4' />
  ],
  outline: [
    <FlagIconOutline strokeWidth={2} className='w-5 h-5' />,
    <ArrowTrendingUpIconOutline strokeWidth={2} className='w-5 h-5' />,
    <BriefcaseIconOutline strokeWidth={2} className='w-5 h-5' />,
    <DocumentTextIconOutline strokeWidth={2} className='w-5 h-5' />
  ]
};

export const PROJECT_PERSONNEl_STATUS = {
  working: 'text-green-500',
  completed: 'text-purple-500',
  quit: 'text-red-500',
  stopped: 'text-gray-500'
};
