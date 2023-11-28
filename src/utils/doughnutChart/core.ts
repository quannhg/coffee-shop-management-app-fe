import { Font, LabelOptions, Options } from '@interfaces';
import { Chart, Color, DoughnutController, FontSpec } from 'chart.js';
import { resolve } from 'chart.js/helpers';
import { utils } from '@utils';

const drawDoughnutLabel = (chart: Chart, options: Options): void => {
  if (chart.chartArea && options) {
    const { labels } = options;
    if (!labels?.length) {
      return;
    }
    const {
      ctx,
      chartArea: { top, right, bottom, left }
    } = chart;

    const innerLabels: LabelOptions[] = [];

    labels.forEach((label) => {
      const text = utils.parseText(label.text, chart);
      const font = utils.parseFont(
        (resolve([label.font, options.font, Chart.defaults.font], ctx, 0) as FontSpec) ||
          Chart.defaults.font
      );
      const color = resolve([label.color, options.color, Chart.defaults.color], ctx, 0) as Color;

      if (font) {
        const innerLabel = {
          text,
          font,
          color: color ?? '#000'
        };
        innerLabels.push(innerLabel);
      }
    });

    let textAreaSize = utils.textSize(chart, innerLabels);

    const hypotenuse = Math.sqrt(
      Math.pow(textAreaSize.width, 2) + Math.pow(textAreaSize.height, 2)
    );
    const innerDiameter = DoughnutController.prototype.innerRadius * 2;
    const fitRatio = innerDiameter / hypotenuse;

    if (fitRatio < 1) {
      innerLabels.forEach((innerLabel) => {
        innerLabel.font.size = Math.floor(innerLabel.font.size * fitRatio);
        innerLabel.font.lineHeight = 1.2;
        innerLabel.font = utils.parseFont(
          (resolve([innerLabel.font, null], ctx, 0) as FontSpec) || Chart.defaults.font
        ) as Font;
      });

      textAreaSize = utils.textSize(chart, innerLabels);
    }

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const centerX = (left + right) / 2;
    const centerY = (top + bottom) / 2;

    const topY = centerY - textAreaSize.height / 2;

    let i;
    const ilen = innerLabels.length;
    let currentHeight = 0;
    for (i = 0; i < ilen; ++i) {
      ctx.fillStyle = innerLabels[i].color;
      ctx.font = innerLabels[i].font.string;

      const lineCenterY = topY + innerLabels[i].font.lineHeight / 2 + currentHeight;
      currentHeight += innerLabels[i].font.lineHeight;

      const text = utils.parseText(innerLabels[i].text, chart);
      ctx.fillText(text, centerX, lineCenterY);
    }
  }
};

export const coreFunctions = {
  drawDoughnutLabel
};

export default drawDoughnutLabel;
