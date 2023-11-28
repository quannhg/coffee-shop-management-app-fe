import { AppNavigation } from '@components/common';
import { ScreenSize } from '@constants';
import { useScreenSize } from '@hooks';
import { useSidebarStore } from '@states';
import { useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';

// Currently, sidebar menu items are also included route config.
// But not every route can be included in sidebar menu.
// TODO: write a lib for breadcrumb and sidebar menu.
export const AppLayout: Component<{ sidebarMenu: SidebarMenuItem[]; routes: TickAppRoute[] }> = ({
  sidebarMenu: menu,
  routes: child
}) => {
  const { openSidebar } = useSidebarStore();

  const routeItems = useMemo(() => {
    const items: { path: string; element: React.ReactElement }[] = [];
    for (const menuItem of menu) {
      if (menuItem === 'divider' || menuItem.type === 'logout-btn') continue;
      if (menuItem.type === 'list') {
        for (const route of menuItem.routes) {
          items.push({ path: route.path, element: route.element });
        }
      } else {
        items.push({ path: menuItem.path, element: menuItem.element });
      }
    }

    for (const childItem of child) {
      items.push({ path: childItem.path, element: childItem.element });
    }

    return items;
  }, [menu, child]);

  const { screenSize } = useScreenSize();
  const showNav = useMemo(() => screenSize <= ScreenSize.MD, [screenSize]);

  return (
    <div
      className={'flex flex-col h-screen sm:min-h-screen ' + (openSidebar ? 'overflow-hidden' : '')}
    >
      <AppNavigation menu={menu} />

      <div className='lg:p-4 flex-1 h-full' style={{ marginLeft: `${!showNav ? 4.5 : 0}rem` }}>
        <Routes>
          {routeItems.map((item) => (
            <Route path={item.path} element={item.element} key={item.path} />
          ))}
        </Routes>
      </div>
    </div>
  );
};
