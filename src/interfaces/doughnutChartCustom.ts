import { Chart, FontSpec, Color } from 'chart.js';

export type FontStyle = 'normal' | 'italic' | 'oblique' | 'initial' | 'inherit';

export type Font = {
  lineHeight: number;
  string: string;
} & FontSpec;

export type LabelText = ((chart: Chart) => string) | string;

export interface LabelOptions {
  text: LabelText;
  font: Font;
  color: Color;
}

export interface Options extends LabelOptions {
  labels?: LabelOptions[];
}
