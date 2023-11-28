import { MutateMemberBox } from '@components/member';
import { QualificationColor } from '@constants';
import { EyeIcon } from '@heroicons/react/24/outline';
import { Card, Chip, IconButton, Tooltip, Typography } from '@material-tailwind/react';
import { memberService } from '@services';
import {
  RowModel,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table';
import { createMemberTitle } from '@utils';
import moment from 'moment';
import { useMemo } from 'react';
import Avatar from 'react-avatar';
import { useNavigate } from 'react-router-dom';

type Member = Awaited<ReturnType<typeof memberService.getAll>>[number];
const columnHelper = createColumnHelper<Member>();

export function MemberListPage() {
  // const { data, refetch: refetchMemberList } = useQuery(['/api/members'], {
  //   queryFn: () => memberService.getAll(),
  //   retry: retryQueryFn
  // });
  const data: {
    /** @description Member ID */
    id: string;
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
    classYear: string | null;
    role: 'COLLABORATOR' | 'MEMBER' | 'ADMIN';
    orientation: 'RESEARCH' | 'ENGINEERING' | 'OPERATION_ASSISTANT' | 'HUMAN_RESOURCE';
    qualification: 'PASSED' | 'WARNING' | 'FAILED' | 'BYPASS' | 'NO_DATA';
    major: string | null;
    joinedAt: number;
    expertises: string[];
    remarks: string | null;
  }[] = [
    {
      id: 'abc',
      firstName: 'quan',
      lastName: 'nguyen hong',
      avatarUrl:
        'https://scontent.fsgn1-1.fna.fbcdn.net/v/t39.30808-6/327469869_722907669285814_7316941061051549723_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=Mo5WThjzdXMAX-zb3ro&_nc_ht=scontent.fsgn1-1.fna&oh=00_AfC8yyAHtmntVllfwkx9qHSkIvNYZbgxw57j6PjhuT865A&oe=6564F233',
      classYear: '4',
      role: 'COLLABORATOR',
      orientation: 'ENGINEERING',
      qualification: 'PASSED',
      major: 'cs',
      joinedAt: 1,
      expertises: ['abc'],
      remarks: 'abc'
    }
  ];

  const navigate = useNavigate();

  const columnDefs = useMemo(
    () => [
      columnHelper.accessor(
        (row) => {
          const title = createMemberTitle(row);

          return (
            <div className='flex items-center gap-4'>
              <Avatar
                round
                size='40px'
                textSizeRatio={2.3}
                src={row.avatarUrl ?? undefined}
                value={row.firstName[0].toUpperCase() + row.lastName[0].toUpperCase()}
              />
              <div>
                <Typography variant='h6'>
                  {row.lastName} {row.firstName}
                </Typography>
                <Typography variant='small' color='gray' className='font-normal'>
                  {title}
                </Typography>
              </div>
            </div>
          );
        },
        {
          id: 'member',
          header: 'z',
          cell: (info) => info.getValue()
        }
      ),
      columnHelper.accessor('qualification', {
        id: 'standard',
        header: 'Chuẩn thành viên',
        cell: (info) => {
          const qualify = info.getValue();
          const color = QualificationColor[qualify];
          return (
            <div className='flex'>
              <Chip
                size='sm'
                color={color}
                variant={qualify === 'BYPASS' ? 'outlined' : undefined}
                value={qualify}
              />
            </div>
          );
        }
      }),
      columnHelper.accessor('joinedAt', {
        id: 'joinedAt',
        header: 'Ngày tham gia',
        cell: (info) => <Typography>{moment.unix(info.getValue()).format('DD/MM/YYYY')}</Typography>
      }),
      columnHelper.accessor('expertises', {
        id: 'expertises',
        header: 'Chuyên môn',
        cell: (info) => info.getValue().join(', ')
      }),
      columnHelper.accessor('remarks', {
        id: 'remarks',
        header: 'Ghi chú',
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

  return (
    <Card>
      <div className='flex p-4 items-center'>
        <Typography variant='h4' className='flex-grow'>
          Danh sách thành viên
        </Typography>
        <MutateMemberBox />
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
      </table>
    </Card>
  );
}
