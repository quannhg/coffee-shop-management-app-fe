// import { QualificationColor } from '@constants';
import { Chip, Typography } from '@material-tailwind/react';
import { StandardPanel } from './StandardPanel';
import { QualificationColor } from '@constants';
import { useMemberStandardStore } from '@states';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import {
  ExclamationTriangleIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
  InformationCircleIcon
} from '@heroicons/react/24/solid';
import { HandThumbUpIcon as HandThumpUpIconOutline } from '@heroicons/react/24/outline';

export const MemberStandard: Component<{ applyingStandards: StandardType[] }> = function ({
  applyingStandards
}) {
  const { memberId } = useParams();
  const standard = useMemberStandardStore((state) => state.standards[memberId ?? '']);

  const QualificationIcon = useMemo(() => {
    if (standard === 'PASSED') return <HandThumbUpIcon className='w-5 h-5' />;
    if (standard === 'BYPASS') return <HandThumpUpIconOutline className='w-5 h-5' />;
    if (standard === 'FAILED') return <HandThumbDownIcon className='w-5 h-5' />;
    if (standard === 'WARNING')
      return <ExclamationTriangleIcon strokeWidth={2} className='w-5 h-5' />;
    return <InformationCircleIcon className='w-5 h-5' />;
  }, [standard]);

  return (
    <div className='p-2 w-full'>
      <div className='mb-4 flex justify-between'>
        <Typography className='text-xl font-semibold text-blue-gray-700'>
          Tiêu chuẩn thành viên
        </Typography>
        <Chip
          color={QualificationColor[standard]}
          variant='ghost'
          className='capitalize w-fit rounded-full pl-3 pr-2 py-1 text-xs'
          value={
            <div className='flex items-center gap-2'>
              {QualificationIcon}
              <span className='normal-case text-xs'>{standard}</span>
            </div>
          }
        />
      </div>

      <div className='flex flex-row gap-2'>
        {applyingStandards.map((standard) => (
          <div className='flex shadow-lg flex-1' key={standard}>
            <StandardPanel type={standard} />
          </div>
        ))}
      </div>
    </div>
  );
};
