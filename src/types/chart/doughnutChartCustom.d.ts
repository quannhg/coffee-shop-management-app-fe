import { Options } from '@interfaces';

declare module 'chart.js' {
  interface PluginOptionsByType {
    doughnutLabel?: Options;
  }
}
