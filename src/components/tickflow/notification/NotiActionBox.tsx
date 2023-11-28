import { useState } from 'react';
import { Dialog, DialogBody, IconButton, Typography } from '@material-tailwind/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useSendingNotificationBox } from '@components/tickflow';
import { ScreenSize, NOTIFICATION_ACTION } from '@constants';
import { useScreenSize } from '@hooks';
import { useFormData } from '@states';

export function useNotiActionBox() {
  const { openSendingNotificationBox, SendingNotificationBox } = useSendingNotificationBox();
  const { screenSize } = useScreenSize();

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const handleOpen = () => setOpenDialog(!open);

  const mobileStyle =
    'self-center min-w-full rounded-none rounded-t-lg overflow-auto !outline-none';
  const desktopStyle = 'self-center rounded-lg overflow-auto !outline-none';

  const NotiActionBox: Component<{ templateId: string }> = ({ templateId }) => {
    const { setTemplateId } = useFormData();

    return (
      <>
        <Dialog
          size={screenSize === ScreenSize.MOBILE ? 'xl' : 'xs'}
          className={screenSize === ScreenSize.MOBILE ? mobileStyle : desktopStyle}
          open={openDialog}
          handler={handleOpen}
        >
          <DialogBody>
            <div className='flex justify-end'>
              <IconButton
                tabIndex={-1}
                color='blue-gray'
                size='sm'
                variant='text'
                className='rounded-full'
                onClick={handleOpen}
              >
                <XMarkIcon strokeWidth={2} className='h-5 w-5' />
              </IconButton>
            </div>
            {NOTIFICATION_ACTION.map((data, index) => (
              <div
                key={index}
                className={
                  'flex items-center gap-2 p-3 rounded-full cursor-pointer ' +
                  (index === NOTIFICATION_ACTION.length - 1
                    ? 'text-red-500 hover:bg-red-100'
                    : 'text-gray-800 hover:bg-gray-100')
                }
                onClick={() => {
                  if (index === 0) {
                    setOpenDialog(false);
                    setTemplateId(templateId);
                    openSendingNotificationBox();
                  } else {
                    return null;
                  }
                }}
              >
                {data.icon}
                <Typography variant='h6'>{data.name}</Typography>
              </div>
            ))}
          </DialogBody>
        </Dialog>
        {<SendingNotificationBox />}
      </>
    );
  };

  return {
    openNotiActionBox: () => setOpenDialog(true),
    NotiActionBox: NotiActionBox
  };
}
