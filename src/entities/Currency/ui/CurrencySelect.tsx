import {
  SelectItem
} from '@/shared/ui/Select/Select';
import { ISelectUIProps, SelectUI } from '@/shared/ui/Select/SelectUI';

import { ECurrency } from '../model/types/currency';

const options = [
  { value: ECurrency.RUB, content: ECurrency.RUB },
  { value: ECurrency.EUR, content: ECurrency.EUR },
  { value: ECurrency.USD, content: ECurrency.USD },
];

type ICurrencySelectProps = Omit<ISelectUIProps, 'children'>;

export const CurrenCySelect = (props: ICurrencySelectProps) => {
  const { defaultValue, onValueChange, trigger } = props;

  return (
    <SelectUI
      onValueChange={onValueChange}
      defaultValue={defaultValue}
      trigger={trigger}
    >
      {options.map((item) => (
        <SelectItem key={item.content} value={item.value}>
          {item.content}
        </SelectItem>
      ))}
    </SelectUI>
  );
};
