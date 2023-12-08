import { AppLayout } from '@layouts';
// import { AuthPage } from '@pages/auth';
import { ProjectPage, DetailProjectPage } from '@pages/tickflow';
import { ChartBarIcon, UserGroupIcon, FireIcon } from '@heroicons/react/24/outline';
import { PowerIcon } from '@heroicons/react/24/solid';
import { authService, userService } from '@services';
import { toast } from 'react-toastify';
import { MemberPage, EmployeeListPage, EmployeeChartPage } from '@pages/member';
import { AuthPage } from '@pages/auth';
import { useQuery } from '@tanstack/react-query';
import { AppSkeleton } from '@components/common';
import { useEffect } from 'react';

export default function App() {
  const { refetch, isFetching, isError } = useQuery(['user'], {
    queryFn: () => userService.getInfo(),
    retry(failureCount, error: ResponseError) {
      if (error.statusCode && error.statusCode >= 400 && error.statusCode < 500) return false;
      return failureCount < 3;
    },
    enabled: false
  });

  useEffect(() => {
    refetch({ throwOnError: true }).catch((err) => {
      if (err.statusCode !== 401) toast.error(err.message);
    });
  }, [refetch]);

  if (isFetching) return <AppSkeleton />;

  if (isError) return <AuthPage />;

  return (
    <AppLayout
      sidebarMenu={[
        {
          type: 'item',
          icon: <FireIcon className='h-5 w-5' />,
          name: 'Món ăn',
          path: '/items',
          element: <ProjectPage />
        },
        {
          type: 'item',
          icon: <UserGroupIcon className='h-5 w-5' />,
          name: 'Nhân viên',
          path: '/employees',
          element: <EmployeeListPage />
        },
        {
          type: 'item',
          icon: <ChartBarIcon className='h-5 w-5' />,
          name: 'Thống kê',
          path: '/charts',
          element: <EmployeeChartPage />
        },
        'divider',
        {
          type: 'logout-btn',
          icon: <PowerIcon className='h-5 w-5' />,
          name: 'Đăng xuất',
          onClick: () =>
            authService
              .logout()
              .then(() => {
                toast.success('Logout successfully!');
                window.location.pathname = '/login';
              })
              .catch((err) => toast.error(err.message))
        }
      ]}
      routes={[
        {
          path: '/projects/:id',
          element: <DetailProjectPage />
        },
        {
          path: '/employees/:memberId',
          element: <MemberPage />
        },
        {
          path: '',
          element: <EmployeeListPage />
        },
        {
          path: 'employees',
          element: <EmployeeListPage />
        }
      ]}
    />
  );
}
