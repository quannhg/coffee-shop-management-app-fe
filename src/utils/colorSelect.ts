import { PROJECT_STATUS_COLOR, PROJECT_STATUS, SUSTENANCE_STATUS, SUSTENANCE_STATUS_COLOR } from '@constants';

export const sustenanceStatusColor: { [status: string]: Color } = SUSTENANCE_STATUS.reduce(
  (result: { [status: string]: Color }, status: string, index: number) => {
    result[status] = SUSTENANCE_STATUS_COLOR[index];
    return result;
  },
  {}
);

export const statusColor: { [status: string]: Color } = PROJECT_STATUS.reduce(
  (result: { [status: string]: Color }, status: string, index: number) => {
    result[status] = PROJECT_STATUS_COLOR[index];
    return result;
  },
  {}
);
