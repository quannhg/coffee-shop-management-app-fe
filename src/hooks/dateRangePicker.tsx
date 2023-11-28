import { NUM_OF_SECONDS_PER_DAY } from '@constants';
import { Input, Radio } from '@material-tailwind/react';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';

export const useDateRangePicker = function () {
  const [fromDate, setFromDate] = useState<number>(moment().unix());
  const [toDate, setToDate] = useState<number>(moment().unix());

  const randName = useMemo(() => `timerange-${Math.floor(Math.random() * 86400) + 1}`, []);
  const [range, setRange] = useState<number>(7);

  useEffect(() => {
    if (range !== -1) {
      const currTime = moment().unix();
      setToDate(currTime);
      setFromDate(currTime - range * NUM_OF_SECONDS_PER_DAY);
    }
  }, [range]);

  return {
    fromDate,
    toDate,
    DateRangePicker: () => (
      <div className='flex justify-center items-start gap-0 flex-col'>
        <Radio
          name={randName}
          label='7 ngày'
          value={7}
          checked={range === 7}
          onChange={(e) => setRange(parseInt(e.target.value))}
        />
        <Radio
          name={randName}
          label='15 ngày'
          value={15}
          checked={range === 15}
          onChange={(e) => setRange(parseInt(e.target.value))}
        />
        <Radio
          name={randName}
          label='30 ngày'
          value={30}
          checked={range === 30}
          onChange={(e) => setRange(parseInt(e.target.value))}
        />
        <Radio
          name={randName}
          label='90 ngày'
          value={90}
          checked={range === 90}
          onChange={(e) => setRange(parseInt(e.target.value))}
        />
        <Radio
          name={randName}
          label='Tùy chỉnh'
          value={-1}
          checked={range === -1}
          onChange={() => setRange(-1)}
        />
        {range === -1 && (
          <div className='flex flex-col gap-4'>
            <hr className='border-blue-gray-500' />
            <Input
              type='date'
              value={moment(fromDate * 1000).format('YYYY-MM-DD')}
              label='Từ ngày'
              onChange={(e) => setFromDate(moment(e.target.value).unix())}
              placeholder='From date'
            />
            <Input
              label='Đến ngày'
              value={moment(toDate * 1000).format('YYYY-MM-DD')}
              type='date'
              onChange={(e) => setToDate(moment(e.target.value).unix())}
              placeholder='To date'
            />
          </div>
        )}
      </div>
    )
  };
};
