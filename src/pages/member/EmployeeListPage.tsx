import { FilterEmployee, SearchEmployee, SelectShop } from '@components/employee';
import { MutateEmployeeBox } from '@components/employee';
import { RoleColor } from '@constants';
import { EyeIcon } from '@heroicons/react/24/outline';
import sortAscending from '@assets/sort-ascending.svg';
import sortDescending from '@assets/sort-descending.svg';
import { Card, Chip, IconButton, Tooltip, Typography } from '@material-tailwind/react';
import {
  RowModel,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table';
import { useEffect, useMemo } from 'react';
import Avatar from 'react-avatar';
import { useNavigate } from 'react-router-dom';
import { useEmployeeListStore, useSelectShopStore } from '@states';
import { convertTimestampToDateFormat } from '@utils';

const columnHelper = createColumnHelper<Employee>();

export function EmployeeListPage() {
  const {
    employeeList: data,
    employeeOrder,
    employeeFilter,
    setOrder,
    getEmployeeList
  } = useEmployeeListStore();
  const { selectedShop } = useSelectShopStore();

  useEffect(() => {
    getEmployeeList(selectedShop === 'all' ? '' : selectedShop.id, employeeOrder, employeeFilter);
  }, [employeeFilter, employeeOrder, getEmployeeList, selectedShop]);

  const navigate = useNavigate();

  const columnDefs = useMemo(() => {
    const getColumnOrderIcon = (colName: EmployeeOrderKey) => {
      const handleOnclick = () => {
        setOrder({
          ...employeeOrder,
          [colName]: employeeOrder[colName] === 'ASC' ? 'DESC' : 'ASC'
        });
      };

      if (!employeeOrder || !employeeOrder[colName]) return <div></div>;
      if (employeeOrder[colName] === 'ASC')
        return (
          <img src={sortAscending} onClick={handleOnclick} className='w-6 h-6 cursor-pointer' />
        );
      if (employeeOrder[colName] === 'DESC')
        return (
          <img src={sortDescending} onClick={handleOnclick} className='w-6 h-6 cursor-pointer' />
        );
      return <div></div>;
    };

    return [
      columnHelper.accessor(
        (row) => {
          return (
            <div className='flex items-center gap-4'>
              <Avatar
                round
                size='40px'
                textSizeRatio={2.3}
                src={row.avatarUrl ?? undefined}
                value={row.name.toUpperCase()}
              />
              <div>
                <Typography variant='h6'>{row.name}</Typography>
              </div>
            </div>
          );
        },
        {
          id: 'employee',
          header: () => {
            const role = 'Nhân viên';
            return (
              <div className='flex items-center gap-2'>
                {getColumnOrderIcon('name')} {role}
              </div>
            );
          },
          cell: (info) => info.getValue()
        }
      ),
      columnHelper.accessor('role', {
        id: 'role',
        header: () => {
          const role = 'Vai trò';
          return (
            <div className='flex items-center gap-2'>
              {getColumnOrderIcon('role')} {role}
            </div>
          );
        },
        cell: (info) => {
          const role = info.getValue();
          const color = RoleColor[role];
          return (
            <div className='flex'>
              <Chip
                size='sm'
                color={color}
                variant={role === 'quản lý' ? undefined : 'outlined'}
                value={role}
              />
            </div>
          );
        }
      }),
      columnHelper.accessor('joinedAt', {
        id: 'joinedAt',
        header: () => {
          const role = 'Ngày vào làm';
          return (
            <div className='flex items-center gap-2'>
              {getColumnOrderIcon('joinedAt')} {role}
            </div>
          );
        },
        cell: (info) => <Typography>{convertTimestampToDateFormat(info.getValue())}</Typography>
      }),
      columnHelper.accessor('birthday', {
        id: 'birthday',
        header: () => {
          const role = 'Ngày sinh';
          return (
            <div className='flex items-center gap-2'>
              {getColumnOrderIcon('birthday')} {role}
            </div>
          );
        },
        cell: (info) => <Typography>{convertTimestampToDateFormat(info.getValue())}</Typography>
      }),
      columnHelper.accessor('gender', {
        id: 'gender',
        header: () => {
          const role = 'Giới tính';
          return (
            <div className='flex items-center gap-2'>
              {getColumnOrderIcon('gender')} {role}
            </div>
          );
        },
        cell: (info) => (
          <Typography>{(info.getValue() === 'Nam' ? 'Nam' : 'Nữ') ?? '-----'}</Typography>
        )
      }),
      columnHelper.accessor('phoneNum', {
        id: 'phoneNum',
        header: 'Số điện thoại',
        cell: (info) => <Typography>{info.getValue() ?? '-----'}</Typography>
      }),
      columnHelper.accessor('id', {
        id: 'id',
        header: () => {
          const role = 'ID';
          return (
            <div className='flex items-center gap-2'>
              {getColumnOrderIcon('name')} {role}
            </div>
          );
        },
        cell: (info) => info.getValue(),
        enableHiding: true
      }),
      columnHelper.display({
        id: 'actions',
        header: '',
        cell(info) {
          return (
            <div className='flex justify-end items-center'>
              <Tooltip content='Xem chi tiết' placement='left'>
                <IconButton
                  size='sm'
                  variant='text'
                  className='rounded-full'
                  color='gray'
                  onClick={() => navigate(`/employees/${info.row.getValue('id')}`)}
                >
                  <EyeIcon className='w-5 h-5' />
                </IconButton>
              </Tooltip>
            </div>
          );
        }
      })
    ];
  }, [employeeOrder, navigate, setOrder]);

  const defaultData = useMemo(() => [], []);

  const memberTable = useReactTable<Employee>({
    columns: columnDefs,
    data: data ?? defaultData,
    getCoreRowModel: getCoreRowModel<RowModel<Employee>>(),
    state: {
      columnVisibility: {
        id: false
      }
    }
  });

  const TableBody = () => {
    return (
      <tbody>
        {memberTable.getRowModel().rows.map((row) => {
          return (
            <tr key={row.id} className='even:bg-blue-gray-50/50'>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className='px-4 py-2'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    );
  };

  return (
    <Card>
      <div className='flex p-4 items-center'>
        <div className='flex flex-col gap-2 flex-grow'>
          <Typography variant='h4'>Danh sách nhân viên</Typography>
          <div className='flex gap-2'>
            <FilterEmployee />
            <div className='w-[250px]'>
              <SelectShop />
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-2 items-end'>
          <div className='w-fit'>
            <MutateEmployeeBox />
          </div>
          <SearchEmployee />
        </div>
      </div>
      <table className='w-full min-w-max table-auto text-left h-full overflow-scroll'>
        <thead>
          {memberTable.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'
                >
                  {header.isPlaceholder ? null : (
                    <div color='blue-gray' className='leading-none opacity-70 font-bold'>
                      {flexRender(header.column.columnDef.header, header.getContext()) ?? ''}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <TableBody />
      </table>
    </Card>
  );
}
