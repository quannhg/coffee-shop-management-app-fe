import moment from 'moment';
import { Alert, Typography } from '@material-tailwind/react';
import { MEMBER_STANDARD_STATUS, MEMBER_STANDARDS_TYPE } from '@constants';
import { useOldMemberStandardStore, useMemberDetailStore } from '@states';
import { StandardStatusIcons } from './StandardStatusIcons';

export const DetailWarningAlert: Component<{
  standardRank: StandardStatus;
  standardType: (typeof MEMBER_STANDARDS_TYPE)[keyof typeof MEMBER_STANDARDS_TYPE];
}> = ({ standardRank, standardType }) => {
  const { memberTimeStandard, memberProjectStandard, memberGPAStandard } =
    useOldMemberStandardStore();
  const { memberDetail } = useMemberDetailStore();

  const MainWarningAlert = () => {
    const { gpaTwoRecentSemester, gpaStandardSetting } = memberGPAStandard;

    if (standardType === 'time') {
      return <span>Tuần trước hoạt động không đủ thời lượng</span>;
    } else if (standardType === 'project') {
      return <span>Chưa có dự án Proposal và Ongoing</span>;
    } else {
      return gpaTwoRecentSemester.length > 0 ? (
        <span>
          Điểm trung bình {gpaTwoRecentSemester[1].semester} là {gpaTwoRecentSemester[1].mark}{' '}
          {`(< ${gpaStandardSetting.gpa})`}
        </span>
      ) : null;
    }
  };

  const MainFailedAlert = () => {
    const { gpaTwoRecentSemester } = memberGPAStandard;

    if (standardType === 'time') {
      return <span>Hai tuần liên tiếp hoạt động không đủ thời lượng</span>;
    } else if (standardType === 'project') {
      return <span>Không có dự án Proposal và Ongoing</span>;
    } else {
      return gpaTwoRecentSemester.length > 0 ? (
        <span>
          Điểm trung bình {gpaTwoRecentSemester[1].semester} và {gpaTwoRecentSemester[0].semester}{' '}
          là {gpaTwoRecentSemester[1].mark} và {gpaTwoRecentSemester[0].mark}
        </span>
      ) : null;
    }
  };

  const SubWarningAlert = () => {
    const { hours } = memberTimeStandard;
    const { violatedTime } = memberProjectStandard;

    if (standardType === 'time') {
      return <span>(Thời lượng tuần trước: {hours} giờ)</span>;
    } else if (standardType === 'project') {
      return violatedTime ? (
        <span>
          (Thỏa mãn chuẩn trước ngày{' '}
          <span className='font-semibold'>
            {moment.unix(violatedTime).locale('en-gb').format('MMM DD, YYYY')}
          </span>
          )
        </span>
      ) : null;
    } else {
      return (
        <span>
          (Cần thỏa mãn trong học kì tới - <span className='font-semibold'>HK232</span>)
        </span>
      );
    }
  };

  const SubFailedAlert = () => {
    if (standardType === 'time') {
      const { violatedTime } = memberTimeStandard;
      return violatedTime ? (
        <span>
          (Không đạt chuẩn từ{' '}
          <span className='font-semibold'>
            {moment.unix(violatedTime).locale('en-gb').format('MMM DD, YYYY')}
          </span>
          )
        </span>
      ) : null;
    } else if (standardType === 'project') {
      const { violatedTime } = memberProjectStandard;
      return violatedTime ? (
        <span>
          (Không đạt chuẩn từ{' '}
          <span className='font-semibold'>
            {moment.unix(violatedTime).locale('en-gb').format('MMM DD, YYYY')}
          </span>
          )
        </span>
      ) : null;
    } else {
      const { violatedTime } = memberGPAStandard;
      return violatedTime ? (
        <span>
          (Không đạt chuẩn từ{' '}
          <span className='font-semibold'>
            {moment.unix(violatedTime).locale('en-gb').format('MMM DD, YYYY')}
          </span>
          )
        </span>
      ) : null;
    }
  };

  const SubNoneFormerAlert = () => {
    if (standardType === 'time') {
      const { violatedTime } = memberTimeStandard;
      return violatedTime ? (
        <span>
          (Vì nhân sự đã rời TickLab từ{' '}
          <span className='font-semibold'>
            {moment.unix(violatedTime).locale('en-gb').format('MMM DD, YYYY')}
          </span>
          )
        </span>
      ) : null;
    } else if (standardType === 'project') {
      const { violatedTime } = memberProjectStandard;
      return violatedTime ? (
        <span>
          (Vì nhân sự đã rời TickLab từ{' '}
          <span className='font-semibold'>
            {moment.unix(violatedTime).locale('en-gb').format('MMM DD, YYYY')}
          </span>
          )
        </span>
      ) : null;
    } else {
      const { violatedTime } = memberGPAStandard;
      return violatedTime ? (
        <span>
          (Vì nhân sự đã rời TickLab từ{' '}
          <span className='font-semibold'>
            {moment.unix(violatedTime).locale('en-gb').format('MMM DD, YYYY')}
          </span>
          )
        </span>
      ) : null;
    }
  };

  if (standardRank === MEMBER_STANDARD_STATUS.warning) {
    return (
      <Alert className='bg-amber-500 bg-opacity-20 p-1 flex flex-col content-start gap-1'>
        <Typography className='inline text-xs font-bold text-amber-500 min-w-max'>
          <StandardStatusIcons standardRank={standardRank} length='4' />
          <MainWarningAlert />
        </Typography>
        <Typography className='text-xs font-normal text-amber-500 min-w-max'>
          <SubWarningAlert />
        </Typography>
      </Alert>
    );
  }
  if (standardRank === MEMBER_STANDARD_STATUS.failed) {
    return (
      <Alert className='bg-red-500 bg-opacity-20 p-1 flex flex-col content-start gap-1'>
        <Typography className='inline text-xs font-bold text-red-500 min-w-max'>
          <StandardStatusIcons standardRank={standardRank} length='4' />
          <MainFailedAlert />
        </Typography>
        <Typography className='text-xs font-normal text-red-500 min-w-max'>
          <SubFailedAlert />
        </Typography>
      </Alert>
    );
  }
  if (standardRank === MEMBER_STANDARD_STATUS.none) {
    return (
      <Alert className='bg-gray-500 bg-opacity-20 p-1 flex flex-col content-start gap-1'>
        <Typography className='inline text-xs font-bold text-gray-600'>
          <StandardStatusIcons standardRank={standardRank} length='4' />
          Không cần đánh giá tiêu chuẩn thành viên
        </Typography>
        <Typography className='text-xs font-normal text-gray-600 min-w-max'>
          {memberDetail.status === 'SENIOR' ? (
            <span>
              (Vì nhân sự này là <span className='font-semibold'>Senior</span>)
            </span>
          ) : (
            <SubNoneFormerAlert />
          )}
        </Typography>
      </Alert>
    );
  }
  return <></>;
};
