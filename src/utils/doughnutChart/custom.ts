import { Chart, FontSpec } from 'chart.js';
import { valueOrDefault, isNullOrUndef, toLineHeight } from 'chart.js/helpers';
import { Font, LabelOptions, LabelText, FontStyle } from '@interfaces';

const parseText = (text: LabelText, chart: Chart): string =>
  typeof text === 'function' ? text(chart) : text;

const parseFont = (value: FontSpec): Font | undefined => {
  const defaults = Chart.defaults;
  const size = valueOrDefault(value.size, defaults.font.size) as number;
  const font: Font = {
    family: valueOrDefault(value.family, defaults.font.family) as string,
    lineHeight: toLineHeight(value.lineHeight as unknown as string, size),
    size: size,
    style: valueOrDefault(value.style, defaults.font.style) as FontStyle,
    weight: valueOrDefault(value.weight, null),
    string: ''
  };

  font.string = utils.toFontString(font);
  return font;
};

const toFontString = (font: Font): string => {
  if (!font || isNullOrUndef(font.size) || isNullOrUndef(font.family)) {
    return '';
  }

  return (
    (font.style ? font.style + ' ' : '') +
    (font.weight ? font.weight + ' ' : '') +
    font.size +
    'px ' +
    font.family
  );
};

const textSize = (chart: Chart, labels: LabelOptions[]): { height: number; width: number } => {
  const { ctx } = chart;
  const prev = ctx.font;
  let width = 0;
  let height = 0;

  labels.forEach((label) => {
    const text = typeof label.text === 'function' ? label.text(chart) : label.text;
    ctx.font = label.font ? label.font.string : '';
    width = Math.max(ctx.measureText(text).width, width);
    height += label.font.lineHeight;
  });

  ctx.font = prev;

  const result = {
    height: height,
    width: width
  };

  return result;
};

export const utils = {
  parseText,
  parseFont,
  toFontString,
  textSize
};

export default utils;
