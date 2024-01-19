import { cn } from "@/lib/utils";
// import { ScrollArea } from "@/registry/new-york/ui/scroll-area";
import { BrowseIconSvg, MusicIconSvg } from "@/shared/assets/Navigation";
import { RoutePath } from "@/shared/config/routeConfig/routes";
import { Button } from "@/widgets/Button";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  playlists?: any;
  //   playlists: Playlist[];
}

export function Sidebar({ className, playlists }: SidebarProps) {
  const [activeLink, setActiveLink] = useState<string>("");
  const menuData = useMemo(() => {
    return [
      {
        name: "Discover",
        key: RoutePath.main,
        sub: [
          {
            name: "Main",
            path: RoutePath.main,
            icon: <MusicIconSvg />,
          },
          {
            name: "About",
            path: RoutePath.about,
            icon: <BrowseIconSvg />,
          },
        ],
      },
      {
        name: "Library",
        key: RoutePath.main,
        sub: [
          {
            name: "Listen Now",
            path: "/",
            icon: <MusicIconSvg />,
          },
          {
            name: "Browse",
            path: "/",
            icon: <BrowseIconSvg />,
          },
        ],
      },
      {
        name: "Profile",
        key: RoutePath.main,
      },
    ];
  }, []);
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        {menuData.map((item) => {
          return (
            <div className="px-3 py-2">
              <h2
                key={item.key}
                className="mb-2 px-4 text-lg font-semibold tracking-tight"
              >
                {item.name}
              </h2>
              {item.sub?.map((sub) => {
                return (
                  <Link to={sub.path} state={{ from: sub.path }}>
                    <Button
                      onClick={() => setActiveLink(sub.path)}
                      variant="ghost"
                      className="w-full justify-start"
                      key={sub.path}
                    >
                      {sub.icon}
                      {sub.name}
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
