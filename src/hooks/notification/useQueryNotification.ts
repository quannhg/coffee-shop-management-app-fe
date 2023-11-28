import { useMemo } from 'react';
import { NOTIFICATION_ITEMS_PER_PAGE } from '@constants';
import { useNotificationGeneralStore } from '@states';

export function useQueryNotification() {
  const { activePage, queryNotification } = useNotificationGeneralStore();

  const notificationParam = useMemo(() => {
    const param: NotificationRequest = {
      perpage: NOTIFICATION_ITEMS_PER_PAGE,
      page: activePage
    };

    return param;
  }, [activePage]);

  return {
    notificationParam: notificationParam,
    queryNotificationParam: useMemo(
      () => async (notificationParam: NotificationRequest) =>
        await queryNotification(notificationParam),
      [queryNotification]
    )
  };
}
