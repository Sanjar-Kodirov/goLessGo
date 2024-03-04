import { FormControl } from '@/shared/ui/Form/Form';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/Select/Select';

export interface ISelectUIProps {
  className?: string;
  defaultValue?: string;
  onValueChange?: (value: any) => void;
  trigger?: string;
  children: React.ReactNode;
}

export const SelectUI = (props: ISelectUIProps) => {
  const { children, trigger, ...restProps } = props;

  return (
    <Select {...restProps}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder={trigger} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>{children}</SelectContent>
    </Select>
  );
};
