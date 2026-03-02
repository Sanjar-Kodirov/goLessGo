import { useSelector } from 'react-redux';

import { memo, useCallback, useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';

import { ArticleView } from '@/entities/Article/model/types/article';
import { ArticleList } from '@/entities/Article/ui/ArticleList/ArticleList';
import { ArticleViewSelector } from '@/entities/Article/ui/ArticleViewSelector/ArticleViewSelector';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useDynamicModuleLoader } from '@/shared/lib/hooks/useDynamicModuleLoader';
import { ContentUI } from '@/widgets/Content/ContentUI';

import {
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

const ArticlesPage = () => {
  const dispatch = useAppDispatch();
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesPageIsLoading);
  const view = useSelector(getArticlesPageView);
  const page = useSelector(getArticlesPageNum);

  const [searchParams] = useSearchParams();

  const onChangeView = useCallback(
    (view: ArticleView) => {
      dispatch(articlesPageActions.setView(view));
    },
    [dispatch],
  );

  const onLoadNextPage = useCallback(() => {
    dispatch(fetchNextArticlesPage());
  }, [dispatch, isLoading]);

  useEffect(() => {
    dispatch(initArticlesPage(searchParams));
  }, [dispatch, searchParams]);

  useDynamicModuleLoader('articlesPage', articlesPageReducer, false);

  return (
    <ContentUI onScrollEnd={onLoadNextPage}>
      <ArticlesPageFilters />
      <div className="flex justify-end mb-4">
        <ArticleViewSelector view={view} onViewClick={onChangeView} />
      </div>
      <ArticleList isLoading={isLoading} view={view} articles={articles} />
    </ContentUI>
  );
};

export default memo(ArticlesPage);
