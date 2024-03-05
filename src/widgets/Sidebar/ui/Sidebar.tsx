import { memo, useMemo, useState } from 'react';

import { Link } from 'react-router-dom';

import {
  BrowseIconSvg,
  MusicIconSvg,
  ProfileIconSvg,
} from '@/shared/assets/svg/navigation';
import { RequireAuth } from '@/shared/config/routeConfig/RequireAuth';
import { RoutePath } from '@/shared/config/routeConfig/routes';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/Button';

import classes from './Sidebar.module.scss';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const [activeLink, setActiveLink] = useState<string>('');
  const [collapsed] = useState<boolean>(false);

  const menuData = useMemo(() => {
    return [
      {
        name: 'Discover',
        key: RoutePath.main,
        sub: [
          {
            name: 'Main',
            path: RoutePath.main,
            icon: <MusicIconSvg />,
            isAuth: false,
          },
          {
            name: 'About',
            path: RoutePath.about,
            icon: <BrowseIconSvg />,
            isAuth: false,
          },
        ],
      },

      {
        name: 'Профиль',
        key: RoutePath.main,
        sub: [
          {
            name: 'Профиль',
            path: RoutePath.profile,
            icon: <ProfileIconSvg />,
            isAuth: true,
          },
        ],
      },
    ];
  }, []);

  const itemsList = useMemo(() => {
    return menuData.map((item) => {
      return (
        <div key={item.name} className={classes.menuItem}>
          <h2 className={classes.menuTitle}>{item.name}</h2>
          {item.sub?.map((sub) => {
            return sub.isAuth ? (
              <RequireAuth>
                <Link to={sub.path} key={sub.name} state={{ from: sub.path }}>
                  <Button
                    onClick={() => setActiveLink(sub.path)}
                    variant={activeLink === sub.path ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    key={sub.path}
                  >
                    {sub.icon}
                    {!collapsed && sub.name}
                  </Button>
                </Link>
              </RequireAuth>
            ) : (
              <Link to={sub.path} key={sub.name} state={{ from: sub.path }}>
                <Button
                  onClick={() => setActiveLink(sub.path)}
                  variant={activeLink === sub.path ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  key={sub.path}
                >
                  {sub.icon}
                  {!collapsed && sub.name}
                </Button>
              </Link>
            );
          })}
        </div>
      );
    });
  }, [activeLink, collapsed, menuData]);

  return (
    <div
      className={cn(
        classes.sidebar,
        { [classes.collapsed]: collapsed },
        className,
      )}
    >
      <div className={classes.menu}>{itemsList}</div>
    </div>
  );
});
