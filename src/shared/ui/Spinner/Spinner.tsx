import { Loader2Icon, LucideProps } from 'lucide-react';

import { cn } from '@/shared/lib/utils';

import cls from './Spinner.module.scss';

type Size = 'small' | 'medium' | 'large' | 'xLarge';

const SpinnerSize: Record<Size, string> = {
  small: 'size_small',
  medium: 'size_medium',
  large: 'size_large',
  xLarge: 'size_xLarge',
};

interface SpinnerProps extends LucideProps {
  size?: Size;
}

function Spinner({ className, size = 'medium', ...props }: SpinnerProps) {
  const mods = {
    [cls[SpinnerSize[size]]]: true,
  };
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn(mods, className, 'animate-spin')}
      {...props}
    />
  );
}

export { Spinner };
