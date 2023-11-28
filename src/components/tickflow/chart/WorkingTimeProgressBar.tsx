import { Progress } from '@material-tailwind/react';
import { MIN_WORKING_HOURS, WorkingTimeColor } from '@constants';

const progressUnit = MIN_WORKING_HOURS / 2; // 8 hours
const progressBaseValues = new Array(progressUnit).fill(null);

export const WorkingTimeProgressBar: Component<{ hours: number }> = ({ hours }) => {
  const progressValues = progressBaseValues.filter((_, index) => hours > index * progressUnit);

  return (
    <div className='flex items-center'>
      {progressValues.map((_, index) => {
        let className = 'bg-gray-300 rounded-none';
        if (index === 0) className += ' rounded-l-full';
        if (index === progressValues.length - 1) className += ' rounded-r-full';

        let value: number;
        if (hours >= (index + 1) * progressUnit) value = 100;
        else value = ((hours - index * progressUnit) / progressUnit) * 100;

        return (
          <Progress
            key={index}
            className={className}
            barProps={{ className: 'rounded-none ' + WorkingTimeColor[index] }}
            value={value}
          />
        );
      })}
    </div>
  );
};
