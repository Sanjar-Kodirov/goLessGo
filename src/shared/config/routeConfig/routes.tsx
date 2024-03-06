import { createBrowserRouter } from 'react-router-dom';

import { AboutPage } from '@/pages/AboutPage';
import { ArticlesPage } from '@/pages/ArticlesPage';
import MainLayout from '@/pages/MainLayout';
import { MainPage } from '@/pages/MainPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfilePage } from '@/pages/ProfilePage';

import { RequireAuth } from './RequireAuth';

export enum AppRoutes {
  MAIN = 'main',
  PROFILE = 'profile',
  ARTICLES = 'articles',
  ABOUT = 'about',

  NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.PROFILE]: '/profile',
  [AppRoutes.ARTICLES]: '/articles',
  [AppRoutes.ABOUT]: '/about',
  [AppRoutes.NOT_FOUND]: '*',
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
        path: RoutePath.articles,
        element: (
          <RequireAuth>
            <ArticlesPage />
          </RequireAuth>
        ),
      },
      {
        path: RoutePath.about,
        element: <AboutPage />,
      },
      {
        path: RoutePath.profile,
        element: (
          <RequireAuth>
            <ProfilePage />
          </RequireAuth>
        ),
      },
      {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
      },
    ],
  },
]);
