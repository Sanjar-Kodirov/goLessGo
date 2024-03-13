import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { memo, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { ArticleDetails } from '@/entities/Article';
import { CommentList } from '@/entities/Comment';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useDynamicModuleLoader } from '@/shared/lib/hooks/useDynamicModuleLoader';
import Text, { TextType } from '@/shared/ui/Text/Text';

import {
  getArticleCommentsError,
  getArticleCommentsIsLoading,
} from '../../model/selectors/comments';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import {
  articleDetailsCommentsReducer,
  getArticleComments,
} from '../../model/slices/articleDetailsCommentsSlice';
import cls from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
  className?: string;
}

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
  const { className } = props;
  const { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();

  const comments = useSelector(getArticleComments.selectAll);
  const isCommentLoading = useSelector(getArticleCommentsIsLoading);
  const commentError = useSelector(getArticleCommentsError);

  console.log('comments', comments);

  useDynamicModuleLoader(
    'articleDetailsComments',
    articleDetailsCommentsReducer,
    true,
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchCommentsByArticleId(id));
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
    <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
      <ArticleDetails id={id} />
      <Text type={TextType.H4} text="Комментарии" />
      <CommentList isLoading={isCommentLoading} comments={comments} />
    </div>
  );
};

export default memo(ArticleDetailsPage);
