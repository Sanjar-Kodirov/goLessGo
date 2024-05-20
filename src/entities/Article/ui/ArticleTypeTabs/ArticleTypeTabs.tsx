import classNames from 'classnames';

import { memo, useCallback, useMemo } from 'react';

import { TabItem, Tabs } from '@/shared/ui/Tabs/Tabs';

import { ArticleType } from '../../model/types/article';

interface ArticleTypeTabsProps {
  className?: string;
  value: ArticleType;
  onChangeType: (type: ArticleType) => void;
}

export const ArticleTypeTabs = memo((props: ArticleTypeTabsProps) => {
  const { className, value, onChangeType } = props;

  const typeTabs = useMemo<TabItem[]>(
    () => [
      {
        value: ArticleType.ALL,
        content: 'Все статьи',
      },
      {
        value: ArticleType.IT,
        content: 'Айти',
      },
      {
        value: ArticleType.ECONOMICS,
        content: 'Экономика',
      },
      {
        value: ArticleType.SCIENCE,
        content: 'Наука',
      },
    ],
    [],
  );

  const onTabClick = useCallback(
    (tab: TabItem) => {
      onChangeType(tab.value as ArticleType);
    },
    [onChangeType],
  );

  return (
    <Tabs
      tabs={typeTabs}
      value={value}
      onTabClick={onTabClick}
      className={classNames('', {}, [className])}
    />
  );
});
