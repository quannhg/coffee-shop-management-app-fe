import moment from 'moment';
import { MANIPULATION_TIME, PROJECT_TIME } from '@constants';
import { ITime } from '@interfaces';

export const manipulateTime: { [time: string]: ITime } = PROJECT_TIME.reduce(
  (result: { [time: string]: ITime }, time: string, index: number) => {
    result[time] = MANIPULATION_TIME[index];
    return result;
  },
  {}
);

export const fromToNow = (time: ITime) => {
  return moment().subtract(time.val, time.type).unix();
};

export const timeCurrent = () => {
  return moment().unix();
};
