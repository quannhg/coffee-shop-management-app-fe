import { invoke, server } from '@services';

export const employeeGeneralService = {
  query: (payload: { order: EmployeeOrder; filter: EmployeeFilter }) =>
    invoke<Employee[]>(server.post('/api/employee', payload)),
  search: (keyword: string) =>
    invoke<EmployeeForSearch[]>(server.get(`/api/employee/search/${keyword}`)),
  postSingle: (employee: CreateEmployeeDto) =>
    invoke<EmployeeForSearch[]>(server.post(`/api/employee`, employee))
};
