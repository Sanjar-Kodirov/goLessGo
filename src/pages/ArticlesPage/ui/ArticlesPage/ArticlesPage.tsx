import classNames from 'classnames';

import { memo } from 'react';

import { Link } from 'react-router-dom';

import { RoutePath } from '@/shared/config/routeConfig/routes';

import cls from './ArticlesPage.module.scss';

interface ArticlesPageProps {
  className?: string;
}

const ArticlesPage = (props: ArticlesPageProps) => {
  const { className } = props;

  return (
    <div className={classNames(cls.ArticlesPage, {}, [className])}>
      ARTICLES PAGE
      <Link to={RoutePath.article_details + '/1'}>Go to details</Link>
    </div>
  );
};

export default memo(ArticlesPage);
