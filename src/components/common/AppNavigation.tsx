import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Tooltip,
  Typography,
  IconButton,
  Accordion,
  AccordionBody,
  AccordionHeader,
  Card,
  List,
  ListItem,
  ListItemPrefix
} from '@material-tailwind/react';
import { useScreenSize } from '@hooks';
import { ScreenSize } from '@constants';
import { useSidebarStore } from '@states';
import logo from '@assets/shopLogo.jpg';
import { NavBarController } from './NavBarController';
import { useLocation, useNavigate, NavigateFunction } from 'react-router-dom';
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { AppDrawer } from './Drawer';

export const AppNavigation: Component<{ menu: SidebarMenuItem[] }> = ({ menu }) => {
  const { screenSize } = useScreenSize();
  const {
    typeNavbar,
    showToggleSidebarBtn,
    openSidebar,
    collapseSidebar,
    setOpenSidebar,
    setTypeNavbar,
    setCollapseSidebar
  } = useSidebarStore();
  const [showNav, setShowNav] = useState<boolean>(false);
  const [expanseSubmenu, setExpanseSubmenu] = useState<number>(-1);

  const { pathname } = useLocation();
  const navigate: NavigateFunction = useNavigate();

  const handleExpandMenu = useCallback(
    (value: number) => {
      setExpanseSubmenu(expanseSubmenu === value ? -1 : value);
    },
    [expanseSubmenu]
  );

  useEffect(() => {
    if (screenSize <= ScreenSize.MD) {
      setShowNav(true);
      setCollapseSidebar(false);
    } else {
      setShowNav(false);
      setCollapseSidebar(true);
    }
    setOpenSidebar(false);
  }, [screenSize, setOpenSidebar, setCollapseSidebar]);

  useEffect(() => {
    setTypeNavbar(pathname);
  }, [pathname, setTypeNavbar]);

  const LogoCard = useMemo(
    () => () =>
      (
        <div className='flex items-center gap-2'>
          <img src={logo} alt='brand' className='' />
          <Typography variant='h5' color='blue-gray'>
            {collapseSidebar ? '' : 'TickLab'}
          </Typography>
        </div>
      ),
    [collapseSidebar]
  );

  const SideBar = useMemo(
    () => (
      <Card
        className={
          `${showNav ? '' : 'fixed top-0 left-0 '}h-[calc(100vh)] w-full ` +
          `${collapseSidebar ? 'max-w-[4.5rem]' : 'max-w-[16rem]'}` +
          ` rounded-none`
        }
      >
        <div className='py-4 flex justify-between items-center px-0'>
          <div
            className='cursor-pointer'
            onClick={() => {
              if (!showNav) {
                setOpenSidebar(!openSidebar);
                setCollapseSidebar(!collapseSidebar);
              }
            }}
          >
            <LogoCard />
          </div>
          {!collapseSidebar && (
            <IconButton
              variant='text'
              color='blue-gray'
              onClick={() => {
                setOpenSidebar(false);
                if (!showNav) {
                  setCollapseSidebar(true);
                }
              }}
              className='mr-2'
            >
              <XMarkIcon strokeWidth={4} className='h-5 w-5' />
            </IconButton>
          )}
        </div>
        <hr className='my-1 border-blue-gray-50' />
        <List>
          {menu.map((menuItem, idx) => {
            if (menuItem === 'divider')
              return (
                <hr
                  className={'my-2 border-blue-gray-50 ' + (collapseSidebar ? 'w-16' : '')}
                  key={menuItem + idx}
                />
              );

            if (menuItem.type === 'list') {
              return (
                <Accordion open={expanseSubmenu === idx} key={menuItem.name}>
                  <Tooltip
                    placement='right'
                    content={collapseSidebar ? `${menuItem.name}` : ''}
                    className={collapseSidebar ? '' : 'bg-inherit'}
                  >
                    <ListItem
                      className={'flex items-center p-0 ' + (collapseSidebar ? 'w-fit' : '')}
                      selected={expanseSubmenu === idx}
                    >
                      <AccordionHeader
                        onClick={() => handleExpandMenu(idx)}
                        className={'border-b-0 p-3 ' + (collapseSidebar ? 'w-10' : '')}
                      >
                        <ListItemPrefix>{menuItem.icon}</ListItemPrefix>
                        <Typography color='blue-gray' className='mr-auto font-normal'>
                          {collapseSidebar ? '' : `${menuItem.name}`}
                        </Typography>
                      </AccordionHeader>
                      <ChevronDownIcon
                        strokeWidth={2.5}
                        className={`mx-auto h-4 w-4 transition-transform ${
                          expanseSubmenu === idx ? 'rotate-180' : ''
                        }`}
                      />
                    </ListItem>
                  </Tooltip>
                  <AccordionBody className='py-1'>
                    <List className='px-4'>
                      {menuItem.routes.map((route) => (
                        <Tooltip
                          key={route.path}
                          placement='right'
                          content={collapseSidebar ? `${route.name}` : ''}
                          className={collapseSidebar ? '' : 'bg-inherit'}
                        >
                          <ListItem
                            className={collapseSidebar ? 'w-fit' : ''}
                            onClick={() => {
                              navigate(route.path);
                              setTypeNavbar(route.path);
                              setOpenSidebar(false);
                              if (!showNav) {
                                setCollapseSidebar(true);
                              }
                            }}
                          >
                            <ListItemPrefix>{route.icon}</ListItemPrefix>
                            {collapseSidebar ? '' : `${route.name}`}
                          </ListItem>
                        </Tooltip>
                      ))}
                    </List>
                  </AccordionBody>
                </Accordion>
              );
            }

            if (menuItem.type === 'item') {
              return (
                <Tooltip
                  key={menuItem.path}
                  placement='right'
                  content={collapseSidebar ? `${menuItem.name}` : ''}
                  className={collapseSidebar ? '' : 'bg-inherit'}
                >
                  <ListItem
                    className={collapseSidebar ? 'w-fit' : ''}
                    onClick={() => {
                      navigate(menuItem.path);
                      setTypeNavbar(menuItem.path);
                      setOpenSidebar(false);
                      if (!showNav) {
                        setCollapseSidebar(true);
                      }
                    }}
                  >
                    <ListItemPrefix>{menuItem.icon}</ListItemPrefix>
                    {collapseSidebar ? '' : `${menuItem.name}`}
                  </ListItem>
                </Tooltip>
              );
            }

            return (
              <Tooltip
                key={menuItem.type}
                placement='right'
                content={collapseSidebar ? `${menuItem.name}` : ''}
                className={collapseSidebar ? '' : 'bg-inherit'}
              >
                <ListItem onClick={menuItem.onClick} className={collapseSidebar ? 'w-fit' : ''}>
                  <ListItemPrefix>{menuItem.icon}</ListItemPrefix>
                  {collapseSidebar ? '' : `${menuItem.name}`}
                </ListItem>
              </Tooltip>
            );
          })}
        </List>
      </Card>
    ),
    [
      expanseSubmenu,
      handleExpandMenu,
      menu,
      navigate,
      showNav,
      setOpenSidebar,
      setTypeNavbar,
      collapseSidebar,
      LogoCard,
      openSidebar,
      setCollapseSidebar
    ]
  );

  return (
    <>
      {showNav && (
        <NavBarController typeNavbar={typeNavbar} showToggleSideBarBtn={showToggleSidebarBtn} />
      )}
      <AppDrawer
        open={openSidebar}
        onClose={() => {
          setOpenSidebar(false);
          if (!showNav) {
            setCollapseSidebar(true);
          }
        }}
      >
        {SideBar}
      </AppDrawer>
      {!showNav && collapseSidebar && SideBar}
    </>
  );
};
