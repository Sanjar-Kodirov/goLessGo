import { memo, useCallback } from 'react';

import { useNavigate } from 'react-router-dom';

import { RoutePath } from '@/shared/config/routeConfig/routes';
import { AvatarUI } from '@/shared/ui/Avatar';
import { BadgeUI } from '@/shared/ui/Badge/BadgeUI';
import { Button } from '@/shared/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/Card/CardUI';
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
    navigate(`${RoutePath.article_details}/${article.id}`);
  }, [article.id, navigate]);

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
      <Card className={cls.card}>
        <CardHeader className={cls.header}>
          <div className={cls.cardHeader}>
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
          <div className={cls.cardImage}>
            <img alt="article image" src={article.img} />
          </div>
          <ArticleTextBlockComponent
            block={textBlock}
            className={cls.textBlock}
          />
          ...
        </CardContent>
        <CardFooter>
          <Button onClick={onOpenArticle}>Читать дальше...</Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className={cls.cardSmall} onClick={onOpenArticle}>
      <img
        alt={article.title}
        className={cls.cardSmallImage}
        src={article.img}
      />
      <CardContent>
        <Text text={article.title} className={cls.title} />
        <CardDescription className={cls.subtitle}>
          {article.subtitle}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <div className="flex items-center gap-1 mr-auto text-sm">{views}</div>
        {article.type.map((type) => (
          <BadgeUI key={type} variant={'outline'}>
            {type}
          </BadgeUI>
        ))}
      </CardFooter>
    </Card>
  );
});
