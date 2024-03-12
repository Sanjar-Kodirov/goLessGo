import classNames from 'classnames';

import { FC, memo } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

import cls from './AvatarUI.module.scss';

type TProps = {
  src: string;
  name?: string;
  alt?: string;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

export const AvatarUI: FC<TProps> = memo((props) => {
  const { name, src, alt, size = 'md', className, ...rest } = props;

  return (
    <Avatar
      className={classNames(cls.Avatar, [cls[size]], className)}
      {...rest}
    >
      <AvatarImage src={src} alt={alt ? alt : 'use image'} />
      <AvatarFallback>{name}</AvatarFallback>
    </Avatar>
  );
});
