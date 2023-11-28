import { useState, useEffect } from 'react';
import { Dialog, DialogBody, DialogHeader, IconButton, Typography } from '@material-tailwind/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { DynamicForm, SendingTextNotification } from '@components/tickflow';
import { ScreenSize } from '@constants';
import { useScreenSize } from '@hooks';
import { useFormData, useNotificationDetailStore } from '@states';

export function useSendingNotificationBox() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const DialogBodyNotification = () => {
    const { screenSize } = useScreenSize();
    const { templateId, openNotiDialog, getFields, getMarkdown, setOpenNotiDialog } = useFormData();
    const { sendingStep, setSendingStep, setEditorReadOnly } = useNotificationDetailStore();

    useEffect(() => {
      if (openNotiDialog === true) {
        setOpenDialog(!openDialog);
        setSendingStep(1);
        setEditorReadOnly(false);
        setOpenNotiDialog(false);
      }
    });

    useEffect(() => {
      if (screenSize <= ScreenSize.MD) {
        getFields(templateId);
      } else {
        getFields(templateId);
        getMarkdown(templateId);
      }
    }, [screenSize, templateId, getFields, getMarkdown]);

    if (screenSize <= ScreenSize.MD) {
      if (sendingStep === 1) {
        return <DynamicForm />;
      } else {
        return <SendingTextNotification />;
      }
    } else {
      return (
        <div className='grid grid-cols-3 gap-4 h-full'>
          <div className='overflow-y-auto'>
            <DynamicForm />
          </div>
          <div className='col-span-2 border-l-2 h-[36rem] overflow-y-auto'>
            <SendingTextNotification />
          </div>
        </div>
      );
    }
  };

  const SendingNotificationBox = () => {
    const { setSendingStep, setEditorReadOnly } = useNotificationDetailStore();
    const handleOpen = () => {
      setOpenDialog(!openDialog);
      setSendingStep(1);
      setEditorReadOnly(false);
    };

    return (
      <Dialog className='z-10' size='xxl' open={openDialog} handler={handleOpen}>
        <DialogHeader className='z-10 flex items-center justify-between'>
          <Typography variant='h5' color='gray' className='sm:text-2xl'>
            Template's name
          </Typography>
          <IconButton
            tabIndex={-1}
            color='blue-gray'
            size='sm'
            variant='text'
            className='rounded-full bg-gray-100 hover:bg-gray-300'
            onClick={handleOpen}
          >
            <XMarkIcon strokeWidth={2} className='h-5 w-5' />
          </IconButton>
        </DialogHeader>
        <DialogBody className='h-screen overflow-y-auto p-0 text-black font-normal' divider>
          <DialogBodyNotification />
        </DialogBody>
      </Dialog>
    );
  };

  return {
    openSendingNotificationBox: () => setOpenDialog(true),
    SendingNotificationBox: SendingNotificationBox
  };
}
