import classNames from 'classnames';

import { memo, useCallback, useMemo } from 'react';

import { SortOrder } from '@/shared/types';
import { SelectItem } from '@/shared/ui/Select/Select';
import { SelectUI } from '@/shared/ui/Select/SelectUI';

import { ArticleSortField } from '../../model/types/article';
import cls from './ArticleSortSelector.module.scss';

interface ArticleSortSelectorProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: ArticleSortField) => void;
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
  const { className, onChangeOrder, onChangeSort, order, sort } = props;

  const orderOptions = useMemo(
    () => [
      {
        value: 'asc',
        content: 'возрастанию',
      },
      {
        value: 'desc',
        content: 'убыванию',
      },
    ],
    [],
  );

  const sortFieldOptions = useMemo(
    () => [
      {
        value: ArticleSortField.CREATED,
        content: 'дате создания',
      },
      {
        value: ArticleSortField.TITLE,
        content: 'названию',
      },
      {
        value: ArticleSortField.VIEWS,
        content: 'просмотрам',
      },
    ],
    [],
  );

  const changeSortHandler = useCallback(
    (newSort: string) => {
      onChangeSort(newSort as ArticleSortField);
    },
    [onChangeSort],
  );

  const changeOrderHandler = useCallback(
    (newOrder: string) => {
      onChangeOrder(newOrder as SortOrder);
    },
    [onChangeOrder],
  );

  return (
    <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
      <SelectUI
        onValueChange={changeSortHandler}
        defaultValue={sort}
        trigger="Сортировать ПО"
      >
        {orderOptions.map((item) => (
          <SelectItem key={item.content} value={item.value}>
            {item.content}
          </SelectItem>
        ))}
      </SelectUI>

      <SelectUI
        onValueChange={changeOrderHandler}
        defaultValue={sort}
        trigger="ПО"
      >
        {sortFieldOptions.map((item) => (
          <SelectItem key={item.content} value={item.value}>
            {item.content}
          </SelectItem>
        ))}
      </SelectUI>
    </div>
  );
});
