import { invoke, server } from '@services';

export const employeeDetailService = {
  query: (id: string) => invoke<EmployeeDetail>(server.get(`/api/employee/${id}`)),
  update: (id: string, employee: EditEmployeeDetail) =>
    invoke<{ status: string }>(server.put(`/api/employee/${id}`, employee)),
  remove: (id: string) => invoke<{ status: string }>(server.delete(`/api/employee/${id}`))
};
