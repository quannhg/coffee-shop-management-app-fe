import { invoke, server } from '@services';

export const notificationGeneralService = {
  query: (payload: NotificationRequest) =>
    invoke<NotificationResponse>(
      server.get(`/api/templates?perpage=${payload.perpage}&page=${payload.page}`)
    )
};
