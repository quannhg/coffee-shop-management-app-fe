import { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { Avatar, Card, CardBody, Chip, Typography } from '@material-tailwind/react';
import { NotificationNavBar, NotificationPagination, useNotiActionBox } from '@components/tickflow';
import { ScreenSize, NOTIFICATION_HEADER } from '@constants';
import { useScreenSize, useQueryNotification } from '@hooks';
import { useNotificationGeneralStore } from '@states';

export function AllNotificationsPage() {
  const { screenSize } = useScreenSize();
  const mainRef = useRef<HTMLDivElement>(null);
  const { openNotiActionBox, NotiActionBox } = useNotiActionBox();

  const { notificationParam, queryNotificationParam } = useQueryNotification();
  const { notificationGeneral, activePage } = useNotificationGeneralStore();

  const [templateId, setTemplateId] = useState<string>('');

  useEffect(() => {
    queryNotificationParam(notificationParam);
  }, [notificationParam, queryNotificationParam]);

  useEffect(() => {
    if (screenSize <= ScreenSize.MD) {
      mainRef.current?.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }, [activePage, screenSize]);

  return (
    <div className={screenSize <= ScreenSize.MD ? 'overflow-y-scroll h-screen' : ''} ref={mainRef}>
      {screenSize <= ScreenSize.MD ? (
        <div className='px-2'>
          {notificationGeneral.data.map((data, index) => (
            <Card
              key={index}
              className='my-4 w-full cursor-pointer drop-shadow-xl hover:ring-4 hover:ring-gray-400 focus:ring-gray-400'
              onClick={() => {
                openNotiActionBox();
                setTemplateId(data.id);
              }}
            >
              <CardBody className='flex flex-col justify-between'>
                <Typography variant='h5' className='truncate'>
                  {data.name}
                </Typography>
                <div className='flex items-center justify-item-center'>
                  <div className='flex lg:flex-wrap items-center gap-1'>
                    {data.type.map((data, index) => (
                      <Chip
                        key={index}
                        size='sm'
                        color={index === 0 ? 'amber' : 'gray'}
                        variant='ghost'
                        className='w-fit rounded-full capitalize'
                        value={data}
                      />
                    ))}
                  </div>
                </div>
                <Typography variant='small' className='font-normal'>
                  {data.description}
                </Typography>
              </CardBody>
            </Card>
          ))}
          <NotiActionBox templateId={templateId} />
        </div>
      ) : (
        <>
          <Card className='h-full w-full drop-shadow-2xl p-4 overflow-x-scroll'>
            <CardBody className='grid gap-4 p-0'>
              <NotificationNavBar />
              <table className='w-full table-fixed text-left'>
                <thead>
                  <tr>
                    {NOTIFICATION_HEADER.map((head, index) => {
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
                            {head}
                          </Typography>
                        </th>
                      );
                    })}
                  </tr>
                </thead>

                <tbody>
                  <>
                    {notificationGeneral.data.map((data, index) => {
                      const classes = 'p-4 border-b border-blue-gray-100';

                      return (
                        <tr
                          key={index}
                          className='even:bg-blue-gray-50/50 cursor-pointer hover:bg-blue-50'
                          onClick={() => {
                            openNotiActionBox();
                            setTemplateId(data.id);
                          }}
                        >
                          <td className={classes}>
                            <Typography
                              variant='h5'
                              color='blue'
                              className='cursor-pointer hover:underline hover:underline-offset-auto !line-clamp-2'
                            >
                              {data.name}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <div className='flex lg:flex-wrap items-center gap-1'>
                              {data.type.map((data, index) => (
                                <Chip
                                  key={index}
                                  size='sm'
                                  color={index === 0 ? 'amber' : 'gray'}
                                  variant='ghost'
                                  className='w-fit rounded-full capitalize'
                                  value={data}
                                />
                              ))}
                            </div>
                          </td>
                          <td className={classes}>
                            <Typography variant='small' className='font-normal !line-clamp-3'>
                              {data.description}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <div className='flex items-center gap-2'>
                              <Avatar size='sm' src={data.lastModified.avatarUrl} alt='avatar' />
                              <Typography color='blue-gray' className='font-normal text-sm'>
                                {moment
                                  .unix(data.lastModified.lastModifiedAt)
                                  .locale('en-gb')
                                  .format('MMM DD, YYYY')}
                              </Typography>
                            </div>
                          </td>
                          <td className={classes}>
                            <div className='flex items-center gap-2'>
                              <Avatar size='sm' src={data.created.avatarUrl} alt='avatar' />
                              <Typography color='blue-gray' className='font-normal text-sm'>
                                {moment
                                  .unix(data.created.createdAt)
                                  .locale('en-gb')
                                  .format('MMM DD, YYYY')}
                              </Typography>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </>
                </tbody>
              </table>
            </CardBody>
          </Card>
          <NotiActionBox templateId={templateId} />
        </>
      )}
      <div className='my-4'>
        {notificationGeneral.data.length > 0 && (
          <NotificationPagination pageNumberMax={notificationGeneral.metadata.totalPage} />
        )}
      </div>
    </div>
  );
}
