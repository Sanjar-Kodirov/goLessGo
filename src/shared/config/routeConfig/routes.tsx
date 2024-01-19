import { createBrowserRouter } from 'react-router-dom';

import { AboutPage } from '@/pages/AboutPage';
import MainLayout from '@/pages/MainLayout';
import { MainPage } from '@/pages/MainPage';

export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.ABOUT]: '/about',
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: RoutePath.main,
        element: <MainPage />,
      },
      {
        path: RoutePath.about,
        element: <AboutPage />,
      },
    ],
  },
]);
