import { Chart } from 'chart.js';
import { Options } from '@interfaces';
import drawDoughnutLabel from './core';

export const DoughnutLabel = {
  id: 'doughnutLabel',
  defaults: {
    font: {
      family: 'sans-serif',
      size: 16,
      style: 'normal',
      weight: 'normal',
      lineHeight: 1.2,
      string: '16px sans-serif'
    }
  },
  beforeDraw: (chart: Chart, args: { cancellable: true }, options: Options): void =>
    drawDoughnutLabel(chart, options)
};
