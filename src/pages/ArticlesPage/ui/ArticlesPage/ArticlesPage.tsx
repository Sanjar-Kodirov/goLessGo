import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { memo, useCallback, useEffect } from 'react';

import { ArticleView } from '@/entities/Article/model/types/article';
import { ArticleList } from '@/entities/Article/ui/ArticleList/ArticleList';
import { ArticleViewSelector } from '@/entities/Article/ui/ArticleViewSelector/ArticleViewSelector';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useDynamicModuleLoader } from '@/shared/lib/hooks/useDynamicModuleLoader';
import { ContentUI } from '@/widgets/Content/ContentUI';

import {
  getArticlesPageHasMore,
  getArticlesPageIsLoading,
  getArticlesPageNum,
  getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import { fetchNextArticlesPage } from '../../model/services/fetchArticlesPage/fetchNextArticlesPage';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import {
  articlesPageActions,
  articlesPageReducer,
  getArticles,
} from '../../model/slices/articlesPageSlice';
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters';
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
  const page = useSelector(getArticlesPageNum);
  const hasMore = useSelector(getArticlesPageHasMore);

  const onChangeView = useCallback(
    (view: ArticleView) => {
      dispatch(articlesPageActions.setView(view));
    },
    [dispatch],
  );

  const onLoadNextPage = useCallback(() => {
    dispatch(fetchNextArticlesPage());
  }, [dispatch, page, hasMore, isLoading]);

  useEffect(() => {
    dispatch(initArticlesPage());
  }, []);

  useDynamicModuleLoader('articlesPage', articlesPageReducer, false);

  return (
    <ContentUI onScrollEnd={onLoadNextPage}>
      <div className={classNames(cls.ArticlesPage, {}, [className])}>
        <ArticlesPageFilters />
        <div className="flex justify-end mb-4">
          <ArticleViewSelector view={view} onViewClick={onChangeView} />
        </div>
        <ArticleList isLoading={isLoading} view={view} articles={articles} />
      </div>
    </ContentUI>
  );
};

export default memo(ArticlesPage);
