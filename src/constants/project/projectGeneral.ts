import { ITime } from '@interfaces';

export const SUSTENANCE_STATUS = ['ready', 'not ready'];

export const PROJECT_STATUS: ProjectStatus[] = [
  'PROPOSAL',
  'ONGOING',
  'REVIEW',
  'COMPLETED',
  'DELAY',
  'CANCELED'
];

export const SUSTENANCE_STATUS_COLOR: Color[] = ['green', 'amber'];

export const PROJECT_STATUS_COLOR: Color[] = ['amber', 'green', 'blue', 'purple', 'indigo', 'red'];

export const PROJECT_TIME = ['Không chọn', '1 tháng', '3 tháng', '6 tháng', '1 năm'];

export const MANIPULATION_TIME: ITime[] = [
  {
    val: undefined,
    type: undefined
  },
  {
    val: 1,
    type: 'months'
  },
  {
    val: 3,
    type: 'months'
  },
  {
    val: 6,
    type: 'months'
  },
  {
    val: 1,
    type: 'years'
  }
];

export const PROJECT_HEADERS = Object.freeze(['Tên món ăn', 'Ảnh', 'Giá', 'Trạng thái']);

export const PROJECT_ITEMS_PER_PAGE = 15;
