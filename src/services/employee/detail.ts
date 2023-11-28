import { invoke, server } from '@services';

export const employeeDetailService = {
  query: (id: string) => invoke<EmployeeDetail>(server.get(`/api/employee/${id}`))
};
