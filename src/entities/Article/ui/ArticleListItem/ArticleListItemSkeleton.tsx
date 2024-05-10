import classNames from 'classnames';

import { memo } from 'react';

import { ArticleTextBlockComponent } from '@/entities/Article/ui/ArticleTextBlockComponent/ArticleTextBlockComponent';
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
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import Text from '@/shared/ui/Text/Text';

import { ArticleView } from '../../model/types/article';
import cls from './ArticleListItem.module.scss';

interface ArticleListItemSkeletonProps {
  className?: string;
  view: ArticleView;
}

export const ArticleListItemSkeleton = memo(
  (props: ArticleListItemSkeletonProps) => {
    const { className, view } = props;

    if (view === ArticleView.COLUMN) {
      return (
        <Card style={{ width: '100%' }} className={cls.card}>
          <CardHeader className={cls.header}>
            <div className={cls.cardHeader}>
              <Skeleton className="w-10 h-10" />
              <Skeleton className="w-16 h-2" />
            </div>
            <Skeleton className="w-full h-10" />
            <Skeleton className="w-full h-2" />
          </CardHeader>
          <CardContent>
            <div className={cls.cardImage}>
              <Skeleton className="w-full h-full" />
            </div>
            <Skeleton className="w-full mt-4 h-10" />
          </CardContent>
          <CardFooter>
            <Skeleton className="w-20 h-10" />
          </CardFooter>
        </Card>
      );
    }

    return (
      <Card className={cls.cardSmall}>
        <Skeleton className={cls.cardSmallImage} />
        <CardContent>
          <Skeleton className="w-full h-10 mb-4" />
          <Skeleton className="w-full h-1  " />
        </CardContent>
        <CardFooter>
          <div className="flex items-center gap-1 mr-auto text-sm">
            <Skeleton className="w-10 h-2" />
          </div>
          <Skeleton className="w-20 h-2" />
        </CardFooter>
      </Card>
    );
  },
);
