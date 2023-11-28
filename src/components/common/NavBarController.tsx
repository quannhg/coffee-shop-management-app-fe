import { IconButton, Navbar } from '@material-tailwind/react';
import { useSidebarStore } from '@states';
import {
  AllMembersNavBar,
  AllProjectsNavBar,
  DetailProjectNavBar,
  NotificationNavBar
} from '@components/tickflow';
import { ToggleSidebarBtn } from './ToggleSidebarBtn';

export const NavBarController: Component<{
  typeNavbar: string;
  showToggleSideBarBtn?: boolean;
}> = ({ typeNavbar, showToggleSideBarBtn }) => {
  const { openSidebar, setOpenSidebar } = useSidebarStore();
  const projectNavbar = '/project';
  const memberNavbar = '/member';
  const notificationNavbar = '/notification';

  const removeTrailingSlash = (str: string) => {
    return str.replace(/\/+$/, '');
  };

  return (
    <Navbar className='w-full max-w-full px-4 rounded-none'>
      <div className='flex items-center gap-4 text-blue-gray-900'>
        {showToggleSideBarBtn && (
          <IconButton
            variant='text'
            className='h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent'
            ripple={false}
            onClick={() => setOpenSidebar(!openSidebar)}
          >
            {<ToggleSidebarBtn open={openSidebar} />}
          </IconButton>
        )}

        {removeTrailingSlash(typeNavbar) === projectNavbar && <AllProjectsNavBar />}
        {removeTrailingSlash(typeNavbar).includes(projectNavbar + '/') &&
          typeNavbar.length > projectNavbar.length && <DetailProjectNavBar />}
        {removeTrailingSlash(typeNavbar) === notificationNavbar && <NotificationNavBar />}
        {removeTrailingSlash(typeNavbar) === memberNavbar && <AllMembersNavBar />}
      </div>
    </Navbar>
  );
};
