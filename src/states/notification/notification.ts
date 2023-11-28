import { create } from 'zustand';
import { toast } from 'react-toastify';
import { TOAST_PENDING } from '@constants';
import { notificationService } from '@services';

export const useFormData = create<DynamicFormData>()((set, get) => ({
  notificationStatus: 'UNINIT',
  templateId: '',
  fields: [],
  haveError: false,
  markdown: '',
  editedMarkdown: '',
  discord: { channelId: [], otherAccount: [] },
  openNotiDialog: false,
  setOpenNotiDialog: (payload) => {
    set({ openNotiDialog: payload });
  },
  setTemplateId: (payload) => {
    set({ templateId: payload });
  },
  setEditedMarkdown: (payload) => {
    set({ editedMarkdown: payload });
  },
  getFields: async (templateId) => {
    set(() => ({ notificationStatus: 'PENDING' }));
    try {
      const fields = await notificationService.getForm(templateId);
      set({ notificationStatus: 'SUCCESS', fields: fields });
    } catch (err) {
      set(() => ({ notificationStatus: 'REJECT' }));
    }
  },
  updateFields: (data) => {
    const fields = get().fields;
    fields.forEach((field) => {
      field.data = data[field.name];
    });
    set({
      fields: fields,
      discord: data['recipients'] as {
        channelId: { id: string; name: string }[];
        otherAccount: { id: string; name: string }[];
      }
    });
  },
  validateFields: async () => {
    set(() => ({ notificationStatus: 'PENDING' }));
    const id = toast.loading(TOAST_PENDING);
    toast.clearWaitingQueue();
    try {
      const error = await notificationService.validateForm(get().fields);
      const haveError = typeof error !== 'string';
      if (haveError)
        toast.update(id, {
          style: {
            zIndex: 10000
          },
          render: `${error.message}`,
          type: 'error',
          isLoading: false,
          autoClose: 10000
        });
      set({ notificationStatus: 'SUCCESS', haveError: haveError });
    } catch (err) {
      set(() => ({ notificationStatus: 'REJECT', haveError: true }));
      if (err instanceof Error && err.message) {
        toast.update(id, {
          style: {
            zIndex: 10000
          },
          render: `${err.message}`,
          type: 'error',
          isLoading: false,
          autoClose: 2000
        });
      }
    }
  },
  getMarkdown: async (templateId) => {
    set(() => ({ notificationStatus: 'PENDING' }));
    try {
      const { markdown } = await notificationService.getMarkdown(templateId);
      set({ notificationStatus: 'SUCCESS', markdown: markdown });
    } catch (err) {
      set(() => ({ notificationStatus: 'REJECT' }));
    }
  },
  previewNotification: async (templateId, payload) => {
    set(() => ({ notificationStatus: 'PENDING' }));
    try {
      const { markdown } = await notificationService.previewForm(templateId, payload);
      set({ notificationStatus: 'SUCCESS', markdown: markdown });
    } catch (err) {
      set(() => ({ notificationStatus: 'REJECT' }));
    }
  },
  sendNotification: async (payload) => {
    set(() => ({ notificationStatus: 'PENDING' }));
    const id = toast.loading(TOAST_PENDING);
    toast.clearWaitingQueue();
    try {
      await notificationService.sendNotification(payload);
      set({ notificationStatus: 'SUCCESS' });
      toast.update(id, {
        style: {
          zIndex: 10000
        },
        render: `Notification is sended successfully`,
        type: 'success',
        isLoading: false,
        autoClose: 2000
      });
    } catch (err) {
      set(() => ({ notificationStatus: 'REJECT' }));
      toast.update(id, {
        style: {
          zIndex: 10000
        },
        render: `Notification is sended failure`,
        type: 'error',
        isLoading: false,
        autoClose: 2000
      });
    }
  }
}));
