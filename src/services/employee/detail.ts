import { invoke, server } from '@services';

export const employeeDetailService = {
  query: (id: string) => invoke<EmployeeDetail>(server.get(`/api/employee/${id}`)),
  update: (id: string, employee: EmployeeDetail) =>
    invoke<EmployeeDetail>(server.put(`/api/employee/${id}`, employee)),
  remove: (id: string) => invoke<EmployeeDetail>(server.delete(`/api/employee/${id}`))
};
