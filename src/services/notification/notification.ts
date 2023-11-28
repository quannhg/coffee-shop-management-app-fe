import { server, invoke } from '@services';

export const notificationService = {
  getForm: (templateId: string) =>
    invoke<FormTemplate>(server.get(`/api/templates/${templateId}/notification/form-builder`)),
  validateForm: (payload: FormTemplate) =>
    invoke<string | Record<string, string>>(
      server.post(`/api/templates/notification/validation-form`, payload)
    ),
  getMarkdown: (templateId: string) =>
    invoke<{ markdown: string }>(
      server.get(`/api/templates/${templateId}/notification/markdown-template`)
    ),
  previewForm: (templateId: string, payload: NotificationElements) =>
    invoke<{ markdown: string }>(
      server.post(`/api/templates/${templateId}/notification/preview`, payload)
    ),
  sendNotification: (payload: SendNotificationContent) =>
    invoke<{ message: string }>(server.post('/api/templates/notification/finish', payload))
};
