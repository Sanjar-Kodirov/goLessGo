import classNames from 'classnames';

import { memo, useCallback } from 'react';

import { useNavigate } from 'react-router-dom';

import { RoutePath } from '@/shared/config/routeConfig/routes';
import { AvatarUI } from '@/shared/ui/Avatar';
import { Button } from '@/shared/ui/Button';
import Card from '@/shared/ui/Card/Card';
import Text from '@/shared/ui/Text/Text';
import { EyeOpenIcon } from '@radix-ui/react-icons';

import {
  Article,
  ArticleBlockType,
  ArticleTextBlock,
  ArticleView,
} from '../../model/types/article';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import cls from './ArticleListItem.module.scss';

interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
  const { className, article, view } = props;
  const navigate = useNavigate();

  const onOpenArticle = useCallback(() => {
    navigate(RoutePath.article_details + article.id);
  }, [article.id, navigate]);

  const types = <Text text={article.type.join(', ')} className={cls.types} />;
  const views = (
    <>
      <Text text={String(article.views)} className={cls.views} />
      <EyeOpenIcon className={cls.icon} />
    </>
  );

  if (view === ArticleView.BIG) {
    const textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT,
    ) as ArticleTextBlock;

    return article.user.avatar && <AvatarUI src={article.user.avatar} />;
  }

  return (
    <div
      className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
    >
      {/* <Card className={cls.card} onClick={onOpenArticle}>
        <div className={cls.imageWrapper}>
          <img alt={article.title} src={article.img} className={cls.img} />
          <Text text={article.createdAt} className={cls.date} />
        </div>
        <div className={cls.infoWrapper}>
          {types}
          {views}
        </div>
        <Text text={article.title} className={cls.title} />
      </Card> */}
    </div>
  );
});
