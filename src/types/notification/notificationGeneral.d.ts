type NotificationRequest = {
  perpage: number;
  page: number;
};

type NotificationSummary = {
  id: string;
  name: string;
  type: string[];
  description: string;
  lastModified: {
    avatarUrl: string;
    lastModifiedAt: number;
  };
  created: {
    avatarUrl: string;
    createdAt: number;
  };
};

type NotificationResponse = {
  metadata: {
    totalPage: number;
  };
  data: NotificationSummary[];
};

type NotificationGeneralStore = {
  statusNotiGeneral: StoreStatus;
  notificationGeneral: NotificationResponse;
  activePage: number;
  inputPage: string;
  setActivePage: (payload: number) => void;
  setInputPage: (payload: string) => void;
  queryNotification: (payload: NotificationRequest) => Promise<void>;
};
