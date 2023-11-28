import { useState } from 'react';
import { Button, Dialog, DialogBody, DialogFooter, Typography } from '@material-tailwind/react';
import { ScreenSize } from '@constants';
import { useScreenSize } from '@hooks';

export const useConfirmCloseBox = (
  handleOpen: () => void,
  { mainMessage, mainButtonMessage, subButtonMessage, subMessage }: BoxConfirm
) => {
  const [confirmCloseOpen, setConfirmCloseOpen] = useState<boolean>(false);
  const handleConfirmCloseOpen = () => setConfirmCloseOpen(!confirmCloseOpen);

  const { screenSize } = useScreenSize();

  const handleConfirmClose = () => {
    handleConfirmCloseOpen();
    handleOpen();
  };

  return {
    openConfirmCloseBox: handleConfirmCloseOpen,
    ConfirmCloseBox: () => (
      <Dialog
        open={confirmCloseOpen}
        handler={handleConfirmCloseOpen}
        size={screenSize === ScreenSize.MOBILE ? 'xl' : 'xs'}
        dismiss={
          {
            outsidePress: false
          } as DismissProps
        }
      >
        <DialogBody divider className='flex flex-col justify-items-center items-center gap-2'>
          <Typography className='flex justify-center' variant='h5'>
            {mainMessage}
          </Typography>
          <Typography variant='paragraph' style={{ textAlign: 'center' }}>
            {subMessage}
          </Typography>
        </DialogBody>
        <DialogFooter className='flex justify-between px-8 py-2'>
          <Button variant='text' color='gray' onClick={handleConfirmCloseOpen}>
            {subButtonMessage}
          </Button>
          <Button variant='text' color='red' onClick={handleConfirmClose}>
            {mainButtonMessage}
          </Button>
        </DialogFooter>
      </Dialog>
    )
  };
};
