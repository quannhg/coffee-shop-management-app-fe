import { ScreenSize } from '@constants';
import { Typography } from '@material-tailwind/react';
import {
  CheckBadgeIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/solid';
import { useScreenSize } from '@hooks';
import { useMemo } from 'react';

export const StatusIcon: Component<{
  qualification: Qualification;
  length?: string;
}> = ({ qualification: qualification, length }) => {
  if (qualification === 'PASSED')
    return (
      <CheckBadgeIcon
        className={'text-green-500 ' + (length ? ` h-${length} w-${length}` : ' w-5 h-5')}
      />
    );

  if (qualification === 'FAILED')
    return (
      <XCircleIcon
        className={'text-red-500 inline ' + (length ? ` h-${length} w-${length}` : ' w-5 h-5')}
      />
    );

  if (qualification === 'WARNING')
    return (
      <ExclamationTriangleIcon
        className={'text-amber-500 inline ' + (length ? ` h-${length} w-${length}` : ' w-5 h-5')}
      />
    );

  return (
    <InformationCircleIcon
      className={'text-gray-500 inline ' + (length ? ` h-${length} w-${length}` : ' w-5 h-5')}
    />
  );
};

export const StandardBadge: Component<{
  qualification: Qualification;
  title: string;
  descriptions?: string[];
}> = ({ qualification, title, descriptions }) => {
  const { screenSize } = useScreenSize();

  const headerColor = useMemo(() => {
    if (qualification === 'PASSED') return ' bg-teal-500 bg-opacity-20';
    if (qualification === 'FAILED') return ' bg-red-500 bg-opacity-20';
    if (qualification === 'WARNING') return ' bg-amber-500 bg-opacity-20';
    return ' bg-gray-500 bg-opacity-20';
  }, [qualification]);

  return (
    <div
      style={{ height: '6rem' }}
      className={`flex flex-col pt-2 p-2 ${screenSize > ScreenSize.MD ? headerColor : ''}`}
    >
      <div className='w-fit flex gap-1 items-center'>
        <StatusIcon qualification={qualification} />
        <Typography className='text-left text-xs font-semibold text-blue-gray-600 inline'>
          {qualification.replaceAll('_', ' ')}
        </Typography>
      </div>
      <Typography className='text-left text-sm font-semibold text-blue-gray-700 w-fit'>
        {title}
      </Typography>
      {descriptions?.map((description, index) => (
        <Typography key={index} className='text-left text-xs font-normal text-blue-gray-600 w-fit'>
          {description}
        </Typography>
      ))}
    </div>
  );
};
