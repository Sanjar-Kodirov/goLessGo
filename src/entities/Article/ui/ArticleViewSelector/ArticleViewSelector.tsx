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
    view: ArticleView.GRID,
    icon: <ViewGridIcon className={cls.icon} />,
  },
  {
    view: ArticleView.COLUMN,
    icon: <ListBulletIcon className={cls.icon} />,
  },
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
  const { className, view, onViewClick } = props;

  const onClick = (newView: ArticleView) => () => {
    onViewClick?.(newView);
  };

  return (
    <div className={classNames(cls.articleViewSelector, {}, [className])}>
      {viewTypes.map(({ view: viewTypeView, icon }) => (
        <Button
          key={viewTypeView}
          variant={view === viewTypeView ? 'destructive' : 'secondary'}
          size="icon"
          onClick={onClick(viewTypeView)}
        >
          {icon}
        </Button>
      ))}
    </div>
  );
});
