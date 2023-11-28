import { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Breadcrumbs,
  Card,
  CardBody,
  Spinner,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Typography
} from '@material-tailwind/react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { BriefcaseIcon } from '@heroicons/react/24/solid';
import {
  CreatePersonnel,
  DetailProjectInfo,
  DetailProjectPersonnel,
  DetailProjectMaterial
} from '@components/tickflow';
import { ScreenSize, PROJECT_DETAIL_MOBILE_TAB, PROJECT_DETAIL_DESKTOP_TAB } from '@constants';
import { useScreenSize } from '@hooks';
import { usePersonnelProjectGeneralStore, useProjectDetailStore, useSidebarStore } from '@states';

export function DetailProjectPage() {
  const { screenSize } = useScreenSize();
  const {
    statusDetail,
    mobileTabView,
    desktopTabView,
    projectDetail,
    getProjectById,
    setMobileTabView,
    setDesktopTabView
  } = useProjectDetailStore();
  const { statusPersonnel, getPersonnelProject } = usePersonnelProjectGeneralStore();

  const { typeNavbar } = useSidebarStore();

  const handleProjectId = useCallback(() => {
    if (typeNavbar === '') return '';
    let projectId = typeNavbar.replace('/project/', '');
    if (projectId.length > 0 && projectId[projectId.length - 1] === '/') {
      projectId = projectId.slice(0, -1);
    }
    return projectId;
  }, [typeNavbar]);

  useEffect(() => {
    const projectId = handleProjectId();
    if (projectId === '') return;
    getProjectById(projectId);
  }, [handleProjectId, getProjectById, typeNavbar]);

  useEffect(() => {
    if (
      mobileTabView === PROJECT_DETAIL_MOBILE_TAB[1] ||
      desktopTabView === PROJECT_DETAIL_DESKTOP_TAB[0].tab
    ) {
      const projectId = handleProjectId();
      if (projectId === '') return;
      getPersonnelProject(projectId);
    }
  }, [mobileTabView, desktopTabView, handleProjectId, getPersonnelProject]);

  if (screenSize <= ScreenSize.MD) {
    return (
      <Tabs value={mobileTabView} className='max-w-[70rem]'>
        <TabsHeader
          className='bg-transparent'
          indicatorProps={{
            className: 'shadow-none'
          }}
        >
          {PROJECT_DETAIL_MOBILE_TAB.map((mobileTab, index) => (
            <Tab
              key={index}
              value={mobileTab}
              className={
                mobileTabView === mobileTab
                  ? 'underline underline-offset-4 text-teal-500 font-medium z-0'
                  : 'font-medium z-0'
              }
              onClick={() => setMobileTabView(mobileTab)}
            >
              {mobileTab}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          <TabPanel value={PROJECT_DETAIL_MOBILE_TAB[0]}>
            {statusDetail === 'UNINIT' || statusDetail === 'PENDING' ? (
              <div className='grid justify-items-center items-center'>
                <Spinner color='green' className='h-12 w-12' />
                <span>Đang tải dữ liệu...</span>
              </div>
            ) : (
              <DetailProjectInfo />
            )}
          </TabPanel>
          <TabPanel value={PROJECT_DETAIL_MOBILE_TAB[1]}>
            {statusPersonnel === 'UNINIT' || statusPersonnel === 'PENDING' ? (
              <div className='grid justify-items-center items-center'>
                <Spinner color='green' className='h-12 w-12' />
                <span>Đang tải dữ liệu...</span>
              </div>
            ) : (
              <DetailProjectPersonnel />
            )}
          </TabPanel>
          <TabPanel value={PROJECT_DETAIL_MOBILE_TAB[2]}>
            <DetailProjectMaterial />
          </TabPanel>
        </TabsBody>
      </Tabs>
    );
  } else {
    return (
      <div className='grid xl:grid-cols-5 lg:grid-cols-4'>
        <div className='flex flex-col gap-4'>
          <Breadcrumbs separator={<ChevronRightIcon strokeWidth={2} className='w-4 h-4' />}>
            <Link to='/project' className='flex items-center gap-2 opacity-60 text-base'>
              <BriefcaseIcon className='w-6 h-6 opacity-60' />
              Dự án
            </Link>
            <Link to='#' className='text-base font-medium'>
              {statusDetail === 'SUCCESS' && projectDetail.name}
            </Link>
          </Breadcrumbs>
          {statusDetail === 'UNINIT' || statusDetail === 'PENDING' ? (
            <div className='grid justify-items-center items-center'>
              <Spinner color='green' className='h-12 w-12' />
              <span>Đang tải dữ liệu...</span>
            </div>
          ) : (
            <DetailProjectInfo />
          )}
        </div>
        <Tabs value={desktopTabView} className='w-full xl:col-span-4 lg:col-span-3'>
          <TabsHeader
            className='bg-teal-500/20 rounded-full gap-12 w-fit mx-auto'
            indicatorProps={{
              className: 'bg-teal-500 rounded-full'
            }}
          >
            {PROJECT_DETAIL_DESKTOP_TAB.map((desktopTab, index) => (
              <Tab
                key={index}
                value={desktopTab.tab}
                onClick={() => setDesktopTabView(desktopTab.tab)}
                className={
                  'text-teal-500 font-semibold px-4 ' +
                  (desktopTabView === desktopTab.tab ? 'text-white' : '')
                }
              >
                <div className='flex items-center gap-2 truncate'>
                  {desktopTab.icon}
                  <span>{desktopTab.tab}</span>
                </div>
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody>
            <TabPanel value={PROJECT_DETAIL_DESKTOP_TAB[0].tab} className='px-1'>
              <Card className='w-full drop-shadow-lg h-screen overflow-y-auto'>
                <CardBody className='grid gap-2'>
                  <div className='flex items-center justify-between'>
                    <Typography variant='h4'>Nhân sự</Typography>
                    <CreatePersonnel />
                  </div>
                  {statusPersonnel === 'UNINIT' || statusPersonnel === 'PENDING' ? (
                    <div className='grid justify-items-center items-center'>
                      <Spinner color='green' className='h-12 w-12' />
                      <span>Đang tải dữ liệu...</span>
                    </div>
                  ) : (
                    <DetailProjectPersonnel />
                  )}
                </CardBody>
              </Card>
            </TabPanel>
          </TabsBody>
        </Tabs>
      </div>
    );
  }
}
