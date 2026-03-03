import classNames from 'classnames';

import { ReactNode, memo, useCallback } from 'react';

import cls from './Tabs.module.scss';
import { Tabs, TabsList, TabsTrigger } from './tabs';

export interface TabItem {
  value: string;
  content: ReactNode;
}

interface TabsProps {
  className?: string;
  tabs: TabItem[];
  value: string;
  onTabClick: (tab: TabItem) => void;
}

export const TabsUI = memo((props: TabsProps) => {
  const { className, tabs, onTabClick, value } = props;

  const clickHandle = useCallback(
    (tab: TabItem) => () => {
      onTabClick(tab);
    },
    [onTabClick],
  );

  return (
    <Tabs value={value} className={classNames(cls.Tabs, {}, [className])}>
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger
            value={tab.value}
            key={tab.value}
            onClick={clickHandle(tab)}
          >
            {tab.content}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
});
