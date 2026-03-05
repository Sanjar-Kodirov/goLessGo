import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { memo, useCallback, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { ArticleDetails } from '@/entities/Article';
import { CommentList } from '@/entities/Comment';
import { AddCommentForm } from '@/features/addCommentForm';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import {
  ReducersList,
  useDynamicModuleLoader,
} from '@/shared/lib/hooks/useDynamicModuleLoader';
import Text, { TextType } from '@/shared/ui/Text/Text';
import { ContentUI } from '@/widgets/Content/ContentUI';

import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { getArticleRecommendations } from '../../model/selectors/recommendations';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { fetchArticleRecommendations } from '../../model/services/fetchArticleRecommendations/fetchArticleRecommendations';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { articleDetailsPageReducer } from '../../model/slices';
import { getArticleComments } from '../../model/slices/articleDetailsCommentsSlice';
import cls from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
  const { className } = props;
  const { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();

  const comments = useSelector(getArticleComments.selectAll);
  const isCommentLoading = useSelector(getArticleCommentsIsLoading);
  const articleRecommendations = useSelector(getArticleRecommendations);

  console.log('articleRecommendations', articleRecommendations);

  useDynamicModuleLoader('articleDetailsPage', undefined, true, reducers);

  const onSendComment = useCallback(
    (text: string) => {
      if (!text || !id) {
        return;
      }
      dispatch(
        addCommentForArticle({
          text,
          articleId: id,
          user: 1,
        }),
      );
    },
    [dispatch],
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchCommentsByArticleId(id));
      dispatch(fetchArticleRecommendations());
    }
  }, []);

  if (!id) {
    return (
      <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        Статья не найдена
      </div>
    );
  }

  return (
    <ContentUI>
      <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        <ArticleDetails id={id} />
        <Text type={TextType.H4} text="Комментарии" />
        <AddCommentForm onSendComment={onSendComment} />
        {/* <ArticleList articles={articleRecommendations} /> */}
        {/* @ts-ignore */}
        <CommentList isLoading={isCommentLoading} comments={comments[0]} />
      </div>
    </ContentUI>
  );
};

export default memo(ArticleDetailsPage);
