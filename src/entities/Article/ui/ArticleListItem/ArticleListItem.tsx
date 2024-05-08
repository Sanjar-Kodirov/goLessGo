import classNames from 'classnames';

import { memo, useCallback } from 'react';

import { useNavigate } from 'react-router-dom';

import { RoutePath } from '@/shared/config/routeConfig/routes';
import { AvatarUI } from '@/shared/ui/Avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/Card/CardUI';
import Text, { TextAlign } from '@/shared/ui/Text/Text';
import { EyeOpenIcon } from '@radix-ui/react-icons';

import {
  Article,
  ArticleBlockType,
  ArticleTextBlock,
  ArticleView,
} from '../../model/types/article';
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

  if (view === ArticleView.COLUMN) {
    const textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT,
    ) as ArticleTextBlock;

    return (
      <Card>
        <CardHeader className={cls.header}>
          <div className="flex justify-between items-center mb-2">
            {article.user.avatar && (
              <AvatarUI
                size="sm"
                src={article.user.avatar}
                name={article.user.username}
              />
            )}
            <div>{article.createdAt}</div>
          </div>
          <CardTitle>{article.title} </CardTitle>
          <CardDescription>{article.subtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] overflow-hidden " data-testid="[200px]:">
            <img
              className="object-cover h-full w-full"
              alt="article image"
              src={article.img}
            />
          </div>
          <Text
            align={TextAlign.LEFT}
            text={textBlock.paragraphs.join(' ').slice(0, 150)}
            className={cls.textBlock}
          />
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    );
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
