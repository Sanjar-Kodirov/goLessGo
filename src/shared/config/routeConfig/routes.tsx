import { createBrowserRouter } from 'react-router-dom';

import { AboutPage } from '@/pages/AboutPage';
import { ArticleDetailsPage } from '@/pages/ArticleDetailsPage';
import { ArticleEditPage } from '@/pages/ArticleEditPage';
import ArticlesPage from '@/pages/ArticlesPage/ui/ArticlesPage/ArticlesPage';
import MainLayout from '@/pages/MainLayout';
import { MainPage } from '@/pages/MainPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfilePage } from '@/pages/ProfilePage';

import { RequireAuth } from './RequireAuth';

export enum AppRoutes {
  MAIN = 'main',
  PROFILE = 'profile',
  ARTICLES = 'articles',
  ARTICLE_DETAILS = 'article_details',
  ARTICLE_CREATE = 'article_create',
  ARTICLE_EDIT = 'article_edit',
  ABOUT = 'about',

  NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.PROFILE]: '/profile',
  [AppRoutes.ARTICLES]: '/articles',
  [AppRoutes.ARTICLE_DETAILS]: '/articles',
  [AppRoutes.ARTICLE_CREATE]: '/articles/create',
  [AppRoutes.ARTICLE_EDIT]: '/articles/:id/edit',
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
        path: `${RoutePath.article_details}/:id`,
        element: (
          <RequireAuth>
            <ArticleDetailsPage />
          </RequireAuth>
        ),
      },
      {
        path: `${RoutePath.article_create}`,
        element: (
          <RequireAuth>
            <ArticleEditPage />
          </RequireAuth>
        ),
      },
      {
        path: `${RoutePath.article_edit}`,
        element: (
          <RequireAuth>
            <ArticleEditPage />
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
