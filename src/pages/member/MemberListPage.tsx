import { MutateMemberBox } from '@components/member';
import { SearchProject } from '@components/tickflow';
import { RoleColor } from '@constants';
import { EyeIcon } from '@heroicons/react/24/outline';
import { Card, Chip, IconButton, Tooltip, Typography } from '@material-tailwind/react';
import {
  RowModel,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table';
import moment from 'moment';
import { useMemo } from 'react';
import Avatar from 'react-avatar';
import { useNavigate } from 'react-router-dom';

type Member = {
  id: string;
  name: string;
  avatarUrl: string;
  role: Role;
  joinedAt: number;
  birthday: number;
  gender: 'nam' | 'nữ';
  phoneNum: string;
};
const columnHelper = createColumnHelper<Member>();

export function EmployeeListPage() {
  // const { data, refetch: refetchMemberList } = useQuery(['/api/members'], {
  //   queryFn: () => memberService.getAll(),
  //   retry: retryQueryFn
  // });
  const data: Member[] = [
    {
      id: 'abc',
      name: 'nguyen hong quan',
      avatarUrl:
        'https://scontent.fsgn1-1.fna.fbcdn.net/v/t39.30808-6/327469869_722907669285814_7316941061051549723_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=Mo5WThjzdXMAX-zb3ro&_nc_ht=scontent.fsgn1-1.fna&oh=00_AfC8yyAHtmntVllfwkx9qHSkIvNYZbgxw57j6PjhuT865A&oe=6564F233',
      role: 'bồi bàn',
      joinedAt: 1,
      birthday: 1,
      gender: 'nam',
      phoneNum: '0999999999'
    }
  ];

  const navigate = useNavigate();

  const columnDefs = useMemo(
    () => [
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
          header: 'Nhân viên',
          cell: (info) => info.getValue()
        }
      ),
      columnHelper.accessor('role', {
        id: 'role',
        header: 'Vai trò',
        cell: (info) => {
          const role = info.getValue();
          const color = RoleColor[role];
          return (
            <div className='flex'>
              <Chip
                size='sm'
                color={color}
                variant={role === 'quản lý' ? 'outlined' : undefined}
                value={role}
              />
            </div>
          );
        }
      }),
      columnHelper.accessor('joinedAt', {
        id: 'joinedAt',
        header: 'Ngày vào làm',
        cell: (info) => <Typography>{moment.unix(info.getValue()).format('DD/MM/YYYY')}</Typography>
      }),
      columnHelper.accessor('birthday', {
        id: 'birthday',
        header: 'Ngày sinh',
        cell: (info) => <Typography>{moment.unix(info.getValue()).format('DD/MM/YYYY')}</Typography>
      }),
      columnHelper.accessor('gender', {
        id: 'gender',
        header: 'Giới tính',
        cell: (info) => <Typography>{info.getValue() ?? '-----'}</Typography>
      }),
      columnHelper.accessor('phoneNum', {
        id: 'phoneNum',
        header: 'Số điện thoại',
        cell: (info) => <Typography>{info.getValue() ?? '-----'}</Typography>
      }),
      columnHelper.accessor('id', {
        id: 'id',
        header: 'ID',
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
                  onClick={() => navigate(`/members/${info.row.getValue('id')}`)}
                >
                  <EyeIcon className='w-5 h-5' />
                </IconButton>
              </Tooltip>
            </div>
          );
        }
      })
    ],
    [navigate]
  );

  const defaultData = useMemo(() => [], []);

  const memberTable = useReactTable<Member>({
    columns: columnDefs,
    data: data ?? defaultData,
    getCoreRowModel: getCoreRowModel<RowModel<Member>>(),
    state: {
      columnVisibility: {
        id: false
      }
    }
  });

  // useListenEvent('member:refetch', refetchMemberList);

  const TableBody = useMemo(() => {
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
  }, [memberTable]);

  return (
    <Card>
      <div className='flex p-4 items-center'>
        <Typography variant='h4' className='flex-grow'>
          Danh sách nhân viên
        </Typography>
        <div>
          <MutateMemberBox />
          <SearchProject />
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
                    <Typography
                      variant='small'
                      color='blue-gray'
                      className='leading-none opacity-70 font-bold'
                    >
                      {flexRender(header.column.columnDef.header, header.getContext()) ?? ''}
                    </Typography>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {TableBody}
      </table>
    </Card>
  );
}
