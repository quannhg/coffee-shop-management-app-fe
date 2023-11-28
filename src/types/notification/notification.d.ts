type SendNotificationContent = {
  markdown: string;
  channelIds: string[];
};

type DynamicFormData = {
  notificationStatus: StoreStatus;
  templateId: string;
  fields: FormTemplate;
  haveError: boolean;
  markdown: string;
  editedMarkdown: string;
  discord: {
    channelId: { id: string; name: string }[];
    otherAccount: { id: string; name: string }[];
  };
  openNotiDialog: boolean;
  setOpenNotiDialog: (payload: boolean) => void;
  setTemplateId: (payload: string) => void;
  setEditedMarkdown: (payload: string) => void;
  getFields: (templateId: string) => Promise<void>;
  updateFields: (data: FormFields) => void;
  validateFields: () => Promise<void>;
  getMarkdown: (templateId: string) => Promise<void>;
  previewNotification: (templateId: string, payload: NotificationElements) => Promise<void>;
  sendNotification: (payload: SendNotificationContent) => Promise<void>;
};
