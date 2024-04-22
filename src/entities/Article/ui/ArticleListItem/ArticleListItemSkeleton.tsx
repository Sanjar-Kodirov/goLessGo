import classNames from 'classnames';

import { memo } from 'react';

import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

import { ArticleView } from '../../model/types/article';
import cls from './ArticleListItem.module.scss';

interface ArticleListItemSkeletonProps {
  className?: string;
  view: ArticleView;
}

export const ArticleListItemSkeleton = memo(
  (props: ArticleListItemSkeletonProps) => {
    const { className, view } = props;

    if (view === ArticleView.BIG) {
      return (
        <div
          className={classNames(cls.ArticleListItem, {}, [
            className,
            cls[view],
          ])}
        >
          {/* <Card className={cls.card}> */}
          <div className={cls.header}>
            <Skeleton />
            <Skeleton className={cls.username} />
            <Skeleton className={cls.date} />
          </div>
          <Skeleton className={cls.title} />
          <Skeleton className={cls.img} />
          <div className={cls.footer}>
            <Skeleton />
          </div>
          {/* </Card> */}
        </div>
      );
    }

    return (
      <div
        className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
      >
        {/* <Card className={cls.card}> */}
        <div className={cls.imageWrapper}>
          <Skeleton className={cls.img} />
        </div>
        <div className={cls.infoWrapper}>
          <Skeleton />
        </div>
        <Skeleton className={cls.title} />
        {/* </Card> */}
      </div>
    );
  },
);
