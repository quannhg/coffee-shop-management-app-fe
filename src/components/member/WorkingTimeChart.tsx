import { useMemo } from 'react';
import { Chart as ChartJS, Legend, Title, Tooltip, LinearScale, TimeScale } from 'chart.js';
import { color } from 'chart.js/helpers';
import { Chart } from 'react-chartjs-2';
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix';
import { memberService } from '@services';
import moment from 'moment';
import { Typography } from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { NUM_OF_SECONDS_PER_DAY } from '@constants';
// import 'chartjs-adapter-date-fns';

type ChartPoint = {
  /** @description week */
  x: number;
  /** @description day */
  y: number;
  /** @description work hours */
  v: number;
  displayValues: string[];
};

ChartJS.register(MatrixController, MatrixElement, Legend, Title, Tooltip, LinearScale, TimeScale);

// TODO: Implement query range picker
export const WorkingTimeChart = () => {
  const { memberId } = useParams();
  const from = moment().unix() - 30 * NUM_OF_SECONDS_PER_DAY;
  const to = moment().unix();
  const { data: worklogs } = useQuery(['/api/members/worklogs', memberId], {
    queryFn: () =>
      memberId !== undefined ? memberService.getWorklogStats(memberId, { from, to }) : []
  });
  const { chartPoints, maxWorkHour } = useMemo(() => {
    if (!worklogs) return { chartPoints: [], maxWorkHour: 0 };
    const workdays: ChartPoint[] = [];

    let maxWorkHour = Number.NEGATIVE_INFINITY;

    const worklogGroup: Record<number, ChartPoint> = {};
    for (const worklog of worklogs) {
      const time = moment.unix(worklog.time);
      const startOfDay = time.startOf('day').unix();
      const dayInWeek = time.day();
      const week = time.week();
      if (!worklogGroup[startOfDay]) {
        worklogGroup[startOfDay] = {
          x: week,
          y: dayInWeek - 1 < 0 ? 6 : dayInWeek - 1,
          v: 0,
          displayValues: []
        };
      }
      worklogGroup[startOfDay].v += worklog.duration / 3600;
    }

    let i = 0;
    const rangeValue = (to - from) / NUM_OF_SECONDS_PER_DAY;
    while (i < rangeValue) {
      const day = moment.unix(from + i * NUM_OF_SECONDS_PER_DAY).startOf('day');
      const startOfDay = day.unix();
      if (worklogGroup[startOfDay]) {
        workdays.push(worklogGroup[startOfDay]);
        worklogGroup[startOfDay].displayValues = [
          `Ngày ` + day.format('DD/MM/YYYY'),
          `Đã hoạt động chuyên môn ` + worklogGroup[startOfDay].v.toFixed(1) + 'h'
        ];

        if (maxWorkHour < worklogGroup[startOfDay].v) {
          maxWorkHour = worklogGroup[startOfDay].v;
        }
      } else {
        const dayInWeek = day.day();
        workdays.push({
          x: day.week(),
          y: dayInWeek - 1 < 0 ? 6 : dayInWeek - 1,
          v: 0,
          displayValues: [`Ngày ` + day.format('DD/MM/YYYY'), 'Không có hoạt động']
        });
      }
      i++;
    }

    return {
      chartPoints: workdays,
      maxWorkHour: maxWorkHour !== Number.POSITIVE_INFINITY ? maxWorkHour : 0
    };
  }, [from, to, worklogs]);

  if (chartPoints.length === 0) return <Typography>Không có dữ liệu</Typography>;

  return (
    <Chart
      type='matrix'
      data={{
        datasets: [
          {
            data: chartPoints,
            backgroundColor(context) {
              const value = context.dataset.data[context.dataIndex].v;
              // Should work 8 hours per day
              const alpha = value / maxWorkHour + 0.1;
              return color('green').alpha(alpha).rgbString();
            },
            borderWidth: 1,
            width: ({ chart }) => (chart.chartArea || {}).width / chart.scales.x.ticks.length - 1,
            height: ({ chart }) => (chart.chartArea || {}).height / 7 - 1
          }
        ]
      }}
      options={{
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              title() {
                return '';
              },
              label(context) {
                const point = context.dataset.data[context.dataIndex] as ChartPoint;
                return point.displayValues;
              }
            }
          },
          title: {
            display: true,
            text: [`Trong năm ${moment().year()}`, `Tuần hiện tại: ${moment().week()}`],
            align: 'center',
            color: 'rgb(107 114 128)'
          }
        },
        scales: {
          x: {
            ticks: {
              stepSize: 1
            },
            grid: {
              display: false
            }
          },
          y: {
            offset: true,
            ticks: {
              stepSize: 1
            },
            grid: {
              display: false
            }
          }
        }
      }}
    />
  );
};
