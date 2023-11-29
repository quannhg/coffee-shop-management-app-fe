import { invoke, server } from '@services';

export const employeeChartService = {
  ageDistribute: () => invoke<AgeDistribute>(server.get(`/api/employee/chart/age`)),
  genderDistribute: () => invoke<GenderDistribute>(server.get(`/api/employee/chart/gender`))
};
