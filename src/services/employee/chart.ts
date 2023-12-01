import { invoke, server } from '@services';

export const employeeChartService = {
  ageDistribute: (shopId: string) => invoke<AgeDistribute>(server.get(`/api/chart/age/${shopId}`)),
  genderDistribute: (shopId: string) =>
    invoke<GenderDistribute>(server.get(`/api/chart/gender/${shopId}`))
};
