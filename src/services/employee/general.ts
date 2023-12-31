import { invoke, server } from '@services';

type ProcedureResult = { status: string };

export const employeeGeneralService = {
  query: (payload: { order: EmployeeOrder; filter: EmployeeFilter }, shopId: string) =>
    invoke<Employee[]>(server.post('/api/employee/filter-order', { payload: payload, shopId })),
  getShops: () => invoke<ShopForSelect[]>(server.get('/api/shops')),
  search: (keyword: string) =>
    invoke<EmployeeForSearch[]>(server.get(`/api/employee/search/${keyword}`)),
  postSingle: (employee: CreateEmployeeDto) =>
    invoke<ProcedureResult>(server.post(`/api/employee`, employee))
};
