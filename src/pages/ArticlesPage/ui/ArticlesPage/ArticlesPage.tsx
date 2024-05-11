import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { memo, useCallback, useEffect } from 'react';

import { ArticleView } from '@/entities/Article/model/types/article';
import { ArticleList } from '@/entities/Article/ui/ArticleList/ArticleList';
import { ArticleViewSelector } from '@/entities/Article/ui/ArticleViewSelector/ArticleViewSelector';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useDynamicModuleLoader } from '@/shared/lib/hooks/useDynamicModuleLoader';

import {
  getArticlesPageIsLoading,
  getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import {
  articlesPageActions,
  articlesPageReducer,
  getArticles,
} from '../../model/slices/articlesPageSlice';
import cls from './ArticlesPage.module.scss';

interface ArticlesPageProps {
  className?: string;
}

const ArticlesPage = (props: ArticlesPageProps) => {
  const { className } = props;
  const dispatch = useAppDispatch();
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesPageIsLoading);
  const view = useSelector(getArticlesPageView);

  const onChangeView = useCallback(
    (view: ArticleView) => {
      dispatch(articlesPageActions.setView(view));
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(articlesPageActions.initState());
    dispatch(
      fetchArticlesList({
        page: 2,
      }),
    );
  }, []);

  useDynamicModuleLoader('articlesPage', articlesPageReducer);

  return (
    <div className={classNames(cls.ArticlesPage, {}, [className])}>
      <div className="flex justify-end mb-4">
        <ArticleViewSelector view={view} onViewClick={onChangeView} />
      </div>
      <ArticleList isLoading={isLoading} view={view} articles={articles} />
    </div>
  );
};

export default memo(ArticlesPage);
