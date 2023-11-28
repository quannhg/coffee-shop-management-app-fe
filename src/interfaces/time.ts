import moment from 'moment';

export type ITime = {
  val: moment.DurationInputArg1 | undefined;
  type: moment.unitOfTime.DurationConstructor | undefined;
};
