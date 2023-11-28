import moment from 'moment';
import 'moment/dist/locale/vi';

export const discordTimeTransformer = (content: string) => {
  const TIMESTAMP_REGEX = /<t:(\d+)>/g;
  const matches = [...content.matchAll(TIMESTAMP_REGEX)];
  const discordTimestamp = matches.map((match) => match[0]);
  const unixTime = matches.map((match) => match[1]);
  const longDayFormat = unixTime.map((time) => moment.unix(parseInt(time, 10)).format('LLL'));

  return {
    discordTimestamp: discordTimestamp,
    longDayFormat: longDayFormat,
    discordToLongDay: discordTimestamp.reduce(
      (result: { [discordTime: string]: string }, discordTime: string, index: number) => {
        result[discordTime] = longDayFormat[index];
        return result;
      },
      {}
    ),
    longDayToDiscord: longDayFormat.reduce(
      (result: { [longDay: string]: string }, longDay: string, index: number) => {
        result[longDay] = discordTimestamp[index];
        return result;
      },
      {}
    )
  };
};

export const convertUnixTimeInContent = (
  content: string,
  discordTimestamp: string[],
  discordToLongDay: { [discordTime: string]: string }
) => {
  const numOfTimeStamp = discordTimestamp.length;
  for (let index = 0; index < numOfTimeStamp; ++index) {
    const element = discordTimestamp[index];
    content = content.replace(element, discordToLongDay[element]);
  }
  return content;
};

export const convertDiscordTimestamp = (
  content: string,
  longDayFormat: string[],
  longDayToDiscord: { [longDay: string]: string }
) => {
  const numOfTimeStamp = longDayFormat.length;
  for (let index = 0; index < numOfTimeStamp; ++index) {
    const element = longDayFormat[index];
    content = content.replace(element, longDayToDiscord[element]);
  }
  return content;
};
