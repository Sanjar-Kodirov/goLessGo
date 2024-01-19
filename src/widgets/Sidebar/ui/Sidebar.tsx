import { useMemo, useState } from 'react';

import { Link } from 'react-router-dom';

import { cn } from '@/lib/utils';
import { BrowseIconSvg, MusicIconSvg } from '@/shared/assets/svg/navigation';
import { RoutePath } from '@/shared/config/routeConfig/routes';
import { Button } from '@/widgets/Button';

import classes from './Sidebar.module.scss';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
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
          },
          {
            name: 'About',
            path: RoutePath.about,
            icon: <BrowseIconSvg />,
          },
        ],
      },

      {
        name: 'Profile',
        key: RoutePath.main,
      },
    ];
  }, []);
  return (
    <div
      className={cn(
        classes.sidebar,
        { [classes.collapsed]: collapsed },
        className,
      )}
    >
      <div className={classes.menu}>
        {menuData.map((item) => {
          return (
            <div className={classes.menuItem}>
              <h2 key={item.key} className={classes.menuTitle}>
                {item.name}
              </h2>
              {item.sub?.map((sub) => {
                return (
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
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
