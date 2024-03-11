import { useSelector } from 'react-redux';

import { memo, useState } from 'react';

import { Link } from 'react-router-dom';

import { getProfileData } from '@/entities/Profile/model/selectors/getProfileData/getProfileData';
import {
  BrowseIconSvg,
  MusicIconSvg,
  ProfileIconSvg,
} from '@/shared/assets/svg/navigation';
import { RequireAuth } from '@/shared/config/routeConfig/RequireAuth';
import { RoutePath } from '@/shared/config/routeConfig/routes';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/Button';
import { FileIcon } from '@radix-ui/react-icons';

import classes from './Sidebar.module.scss';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const [activeLink, setActiveLink] = useState<string>('');
  const [collapsed] = useState<boolean>(false);

  const profileData = useSelector(getProfileData);

  const menuData = [
    {
      id: 1,
      name: 'Discover',
      key: RoutePath.main,
      sub: [
        {
          name: 'Главная',
          path: RoutePath.main,
          icon: <MusicIconSvg />,
          isAuth: false,
        },
        {
          name: 'Статьи',
          path: RoutePath.articles,
          icon: <FileIcon className="h-4 w-4 mr-2" />,
          isAuth: true,
        },
        {
          name: 'О нас',
          path: RoutePath.about,
          icon: <BrowseIconSvg />,
          isAuth: false,
        },
      ],
    },

    {
      id: 2,
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

  const itemsList = menuData.map((item) => {
    return (
      <div key={item.id} className={classes.menuItem}>
        <h2 className={classes.menuTitle}>{item.name}</h2>
        {item.sub?.map((sub) => {
          return sub.isAuth ? (
            <RequireAuth redirect={false} key={sub.name}>
              <Link to={sub.path} state={{ from: sub.path }}>
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
            <Link key={sub.name} to={sub.path} state={{ from: sub.path }}>
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
