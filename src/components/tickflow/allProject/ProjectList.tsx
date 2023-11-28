import { useNavigate } from 'react-router-dom';
import { Card, CardBody, Chip, Spinner, Typography } from '@material-tailwind/react';
import { AllProjectsNavBar } from './AllProjectsNavBar';
import { ShowMember } from '@components/tickflow';
import { PROJECT_HEADERS } from '@constants';
import { formatCurrency, sustenanceStatusColor } from '@utils';
import { useMemo } from 'react';

// TODO: consider about performance
export const ProjectList: Component = () => {
  const navigate = useNavigate();

  const isLoading = false,
    isError = false,
    data = {};
  // const { data, isLoading, isError } = useQuery(['/api/projects'], {
  //   queryFn: () => projectService.getAll(),
  //   retry: retryQueryFn
  // });

  const subtenancies = [
    {
      id: 'pro_abc123',
      name: 'trà sữa',
      avatarUrl:
        'https://product.hstatic.net/200000421745/product/ts_tran_chau_052aed385e41470db7cec46eddfcfdbb_1024x1024.png',
      price: 19000,
      status: 'READY'
    },
    {
      id: 'pro_abc124',
      name: 'Cà phê',
      avatarUrl:
        'https://product.hstatic.net/200000480127/product/ca_phe_da_mang_di_9728fecf033b414191f4315f472eac0d_1024x1024.png',
      price: 15000,
      status: 'NOT_READY'
    }
  ];

  const TableBody = useMemo(() => {
    if (isLoading)
      return (
        <tr>
          <td colSpan={PROJECT_HEADERS.length}>
            <div className='grid justify-items-center items-center'>
              <Spinner color='green' className='h-12 w-12' />
              <span>Đang tải dữ liệu...</span>
            </div>
          </td>
        </tr>
      );

    if (isError || data === undefined)
      return (
        <tr>
          <td colSpan={PROJECT_HEADERS.length}>
            <div className='grid justify-items-center items-center'>
              <Typography variant='small' color='red'>
                Đã xảy ra lỗi, vui lòng thử lại
              </Typography>
            </div>
          </td>
        </tr>
      );

    // const { data: projects } = data;
    if (subtenancies.length === 0)
      return (
        <tr>
          <td colSpan={PROJECT_HEADERS.length} className='text-center'>
            Không có dữ liệu trùng khớp
          </td>
        </tr>
      );

    return subtenancies.map((sustenance, index) => {
      const classes = 'p-4 border-b border-blue-gray-100';
      return (
        <tr
          key={index}
          className='even:bg-blue-gray-50/50 cursor-pointer hover:bg-blue-50'
          onClick={() => {
            navigate(`/projects/${sustenance.id}`);
          }}
        >
          <td className={classes}>
            <Typography
              variant='h5'
              color='blue'
              className='capitalize cursor-pointer hover:underline hover:underline-offset-auto !line-clamp-2'
            >
              {sustenance.name}
            </Typography>
          </td>
          <td className={classes}>
            {
              <ShowMember
                members={[
                  {
                    name: sustenance.name,
                    imgURL: sustenance.avatarUrl
                  }
                ]}
                numVisibleMember={1}
              />
            }
          </td>
          <td className={classes}>
            <Typography variant='small' className='font-normal !line-clamp-3'>
              {formatCurrency(sustenance.price)}
            </Typography>
          </td>
          <td className={classes}>
            <Chip
              variant='ghost'
              size='lg'
              value={sustenance.status}
              color={sustenanceStatusColor[sustenance.status]}
              className='w-fit'
            />
          </td>
        </tr>
      );
    });
  }, [isLoading, isError, data, subtenancies, navigate]);

  return (
    <Card className='h-full w-full drop-shadow-2xl p-4 min-h-screen overflow-x-scroll'>
      <CardBody className='grid gap-4 p-0'>
        <AllProjectsNavBar />
        <table className='w-full table-auto text-left'>
          <thead>
            <tr>
              {PROJECT_HEADERS.map((header, index) => {
                return (
                  <th
                    key={index}
                    className={
                      'border-y border-blue-gray-100 bg-blue-gray-100/50 p-4 transition-colors truncate'
                    }
                  >
                    <Typography
                      variant='paragraph'
                      color='blue-gray'
                      className='flex items-center justify-between font-bold leading-none opacity-70'
                    >
                      {header}
                    </Typography>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>{TableBody}</tbody>
        </table>
      </CardBody>
    </Card>
  );
};
