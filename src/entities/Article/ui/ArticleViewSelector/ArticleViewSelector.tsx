import classNames from 'classnames';

import { memo } from 'react';

import { Button } from '@/shared/ui/Button';
import { ListBulletIcon, ViewGridIcon } from '@radix-ui/react-icons';

import { ArticleView } from '../../model/types/article';
import cls from './ArticleViewSelector.module.scss';

interface ArticleViewSelectorProps {
  className?: string;
  view: ArticleView;
  onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
  {
    view: ArticleView.SMALL,
    icon: ViewGridIcon,
  },
  {
    view: ArticleView.BIG,
    icon: ListBulletIcon,
  },
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
  const { className, view, onViewClick } = props;

  const onClick = (newView: ArticleView) => () => {
    onViewClick?.(newView);
  };

  return (
    <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
      {viewTypes.map((viewType) => (
        <Button variant="destructive" onClick={onClick(viewType.view)}>
          {/* <Icon */}
          {/* Svg={viewType.icon}
          className=
          {classNames('', {
            [cls.notSelected]: viewType.view !== view,
          })} */}
          {/* /> */}
          <viewType.icon
            className={classNames('', {
              [cls.notSelected]: viewType.view !== view,
            })}
          />
        </Button>
      ))}
    </div>
  );
});
