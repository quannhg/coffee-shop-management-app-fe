import { MEMBER_STANDARD_STATUS } from '@constants';
import {
  CheckBadgeIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/solid';

export const StandardStatusIcons: Component<{
  standardRank: StandardStatus;
  length?: string;
}> = ({ standardRank, length }) => {
  if (standardRank === MEMBER_STANDARD_STATUS.pass) {
    return (
      <CheckBadgeIcon
        className={'text-green-500 inline ' + (length ? ` h-${length} w-${length}` : ' w-5 h-5')}
      />
    );
  } else if (standardRank === MEMBER_STANDARD_STATUS.failed) {
    return (
      <XCircleIcon
        className={'text-red-500 inline ' + (length ? ` h-${length} w-${length}` : ' w-5 h-5')}
      />
    );
  } else if (standardRank === MEMBER_STANDARD_STATUS.warning) {
    return (
      <ExclamationTriangleIcon
        className={'text-amber-500 inline ' + (length ? ` h-${length} w-${length}` : ' w-5 h-5')}
      />
    );
  } else {
    return (
      <InformationCircleIcon
        className={'text-gray-500 inline ' + (length ? ` h-${length} w-${length}` : ' w-5 h-5')}
      />
    );
  }
};
