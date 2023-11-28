import { WorkingTimeProgressBar } from '@components/tickflow';
import { MIN_WORKING_HOURS, NUM_SECS_IN_HOUR } from '@constants';
import { Typography } from '@material-tailwind/react';
import { memberService } from '@services';
import { useQuery } from '@tanstack/react-query';
import { retryQueryFn } from '@utils';
import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { StandardBadge } from './StandardBadge';
import { FetchError, Loading } from '@components/common';
import { StandardSummary } from './StandardSummary';
import { HandThumbDownIcon, HandThumbUpIcon } from '@heroicons/react/24/solid';
import { useMemberStandardStore } from '@states';
import { ProjectDoughnutChart } from './ProjectDoughnutChart';
import { GPALineChart } from './GPALineChart';
import { WorkingTimeChart } from './WorkingTimeChart';

export const StandardPanel: Component<{ type: StandardType }> = function ({ type }) {
  const { memberId } = useParams();
  const {
    data: standard,
    isLoading,
    isError
  } = useQuery(['/api/members/standard', memberId, type], {
    queryFn: () => (memberId ? memberService.getStandard(memberId, type) : null),
    retry: retryQueryFn
  });

  const { setStandard, standards: standardStates } = useMemberStandardStore();
  useEffect(() => {
    if (!memberId || !standard) return;
    const currentStandard = standardStates[memberId];
    if (!currentStandard) setStandard(memberId, standard.qualification);

    if (
      currentStandard === 'FAILED' ||
      currentStandard === 'NO_DATA' ||
      currentStandard === 'BYPASS'
    )
      return;
    if (currentStandard === 'WARNING') {
      if (standard.qualification === 'FAILED') setStandard(memberId, 'FAILED');
      return;
    }
    setStandard(memberId, standard.qualification);
  }, [memberId, setStandard, standard, standardStates]);

  const { standardTitle, descriptions, summaryTitle } = useMemo(() => {
    if (type === 'WORKING_TIME')
      return {
        standardTitle: 'Thời lượng làm việc',
        summaryTitle: 'Trung bình / tuần',
        descriptions: [`Tối thiểu ${MIN_WORKING_HOURS} giờ/tuần`]
      };
    if (type === 'PROJECT') {
      return {
        standardTitle: 'Dự án',
        summaryTitle: 'Đang hoạt động',
        descriptions: ['Tối thiểu 1 dự án đang hoạt động']
      };
    }

    return {
      standardTitle: 'Điểm TBHK',
      descriptions: ['2 HK gần nhất có GPA >= 3.0'],
      summaryTitle: '2 HK gần nhất'
    };
  }, [type]);

  const SummaryContent = useMemo(() => {
    if (isLoading) return <Loading />;
    if (isError || !standard) return <FetchError />;

    if (standard.type === 'WORKING_TIME') {
      const currentWeekHours = standard.summary.currentWeek / NUM_SECS_IN_HOUR;
      return (
        <div className='flex flex-col gap-1 items-start'>
          <Typography className='text-lg font-bold text-blue-gray-700'>
            {(standard.summary.averagePerWeek / NUM_SECS_IN_HOUR).toFixed(1)} {' giờ'}
          </Typography>
          <div className='flex flex-col gap-1'>
            <Typography className='text-xs font-medium text-blue-gray-400'>
              Tuần này:{' '}
              <span className='text-xs font-semibold text-blue-gray-700'>
                {currentWeekHours.toFixed(1)} giờ
              </span>
            </Typography>
            <WorkingTimeProgressBar hours={currentWeekHours} />
          </div>
        </div>
      );
    }

    if (standard.type === 'PROJECT') {
      return (
        <div className='w-full h-full flex items-center justify-center'>
          <Typography variant='h2' className='font-bold text-blue-gray-700'>
            {standard.projects.IN_PROGRESS}
          </Typography>
        </div>
      );
    }

    if (standard.data.length === 0)
      return (
        <Typography className='text-xs font-medium text-blue-gray-400'>Chưa có dữ liệu</Typography>
      );
    const twoRecentSemesters = standard.data.length > 2 ? standard.data.slice(-2) : standard.data;
    return (
      <div>
        {twoRecentSemesters.reverse().map((data, index) => (
          <Typography key={index} className='flex gap-1 text-xs font-bold text-blue-gray-700'>
            {data.qualified ? (
              <HandThumbUpIcon className='w-4 h-4 text-green-500 inline' />
            ) : (
              <HandThumbDownIcon className='w-4 h-4 text-red-500 inline' />
            )}
            {data.gpa.toFixed(1)}
            <span className='text-xs font-medium text-blue-gray-400'>{data.semester}</span>
          </Typography>
        ))}
      </div>
    );
  }, [standard, isLoading, isError]);

  const Content = useMemo(() => {
    if (!standard) return;
    if (standard.type === 'PROJECT') return <ProjectDoughnutChart projects={standard.projects} />;
    if (standard.type === 'GPA') return <GPALineChart gpas={standard.data} />;
    return <WorkingTimeChart />;
  }, [standard]);

  if (isLoading) return <Loading />;
  if (isError || !standard) return <FetchError />;

  return (
    <div className='flex flex-col gap-2'>
      <div className='grid grid-cols-2'>
        <StandardBadge
          qualification={standard.qualification}
          title={standardTitle}
          descriptions={descriptions}
        />
        <StandardSummary title={summaryTitle}>{SummaryContent}</StandardSummary>
      </div>

      <div className='p-3'>{Content}</div>
    </div>
  );
};
