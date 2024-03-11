import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { memo, useCallback, useEffect } from 'react';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useDynamicModuleLoader } from '@/shared/lib/hooks/useDynamicModuleLoader';
import { AvatarUI } from '@/shared/ui/Avatar';
import Divider from '@/shared/ui/Divider/Divider';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import Text, { TextTheme, TextType } from '@/shared/ui/Text/Text';
import { CalendarIcon, EyeOpenIcon } from '@radix-ui/react-icons';

import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { ArticleBlock, ArticleBlockType } from '../../model/types/article';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import cls from './ArticleDetails.module.scss';

interface ArticleDetailsProps {
  className?: string;
  id: string;
}

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
  const { className, id } = props;

  useDynamicModuleLoader('articleDetails', articleDetailsReducer, true);

  const dispatch = useAppDispatch();

  const isLoading = useSelector(getArticleDetailsIsLoading);
  const article = useSelector(getArticleDetailsData);
  const error = useSelector(getArticleDetailsError);

  useEffect(() => {
    dispatch(fetchArticleById(id));
  }, [dispatch, id]);

  const renderBlock = useCallback((block: ArticleBlock) => {
    switch (block.type) {
      case ArticleBlockType.CODE:
        return (
          <ArticleCodeBlockComponent
            key={block.id}
            block={block}
            className={cls.block}
          />
        );
      case ArticleBlockType.IMAGE:
        return (
          <ArticleImageBlockComponent
            key={block.id}
            block={block}
            className={cls.block}
          />
        );
      case ArticleBlockType.TEXT:
        return (
          <ArticleTextBlockComponent
            key={block.id}
            className={cls.block}
            block={block}
          />
        );
      default:
        return null;
    }
  }, []);

  let content;

  if (isLoading) {
    content = (
      <>
        <Skeleton className={cls.avatar} />
        <Skeleton className={cls.title} />
        <Skeleton className={cls.skeleton} />
        <Skeleton className={cls.skeleton} />
        <Skeleton className={cls.skeleton} />
      </>
    );
  } else if (error) {
    content = (
      <>
        <h1>Произошла ошибка при загрузке статьи.</h1>
        <Text
          theme={TextTheme.ERROR}
          title="Произошла ошибка при загрузке статьи."
        />
      </>
    );
  } else if (article) {
    content = (
      <>
        <div className={cls.avatarWrapper}>
          <AvatarUI src={article?.img} className={cls.avatar} />
        </div>
        <Text
          title={article?.title}
          text={article?.subtitle}
          type={TextType.H2}
        />
        <div className={cls.articleInfo}>
          <EyeOpenIcon />
          <Text text={String(article?.views)} />
        </div>
        <div className={cls.articleInfo}>
          <CalendarIcon className={cls.icon} />
          <Text text={article?.createdAt} />
        </div>
        {article?.blocks.map(renderBlock)}
      </>
    );
  }

  return (
    <div className={classNames(cls.ArticleDetails, {}, [className])}>
      {content}
      <Divider />
    </div>
  );
});
