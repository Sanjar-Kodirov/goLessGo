import { cn } from '@/shared/lib/utils';

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'p'
    | 'muted'
    | 'large'
    | 'small'
    | 'blockquote';
}

export function Text({ variant = 'p', className, ...props }: TextProps) {
  const styles = {
    h1: 'text-4xl font-extrabold tracking-tight',
    h2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
    h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
    h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
    p: 'leading-7',
    muted: 'text-sm text-muted-foreground',
    large: 'text-lg font-semibold',
    small: 'text-sm leading-none font-medium',
    blockquote: 'mt-6 border-l-2 pl-6 italic',
  };
  return <p className={cn(styles[variant], className)} {...props} />;
}
