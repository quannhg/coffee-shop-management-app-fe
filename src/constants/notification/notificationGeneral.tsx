import {
  InformationCircleIcon,
  PaperAirplaneIcon,
  PencilIcon,
  Square2StackIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

export const NOTIFICATION_HEADER = [
  'TÊN BẢN MẪU',
  'PHÂN LOẠI',
  'MÔ TẢ',
  'CHỈNH SỬA CUỐI',
  'TẠO BỞI'
];

export const NOTIFICATION_ACTION = [
  {
    name: 'Gửi thông báo',
    icon: <PaperAirplaneIcon strokeWidth={1.5} className='w-6 h-6' />
  },
  {
    name: 'Chỉnh sửa bản mẫu',
    icon: <PencilIcon strokeWidth={1.5} className='w-6 h-6' />
  },
  {
    name: 'Nhân đôi bản mẫu',
    icon: <Square2StackIcon strokeWidth={1.5} className='w-6 h-6' />
  },
  {
    name: 'Thông tin bản mẫu',
    icon: <InformationCircleIcon strokeWidth={1.5} className='w-6 h-6' />
  },
  {
    name: 'Xóa bản mẫu',
    icon: <TrashIcon strokeWidth={1.5} className='w-6 h-6' />
  }
];

export const NOTIFICATION_ITEMS_PER_PAGE = 15;
