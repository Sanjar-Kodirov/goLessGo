import { FC, memo } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/widgets/Avatar';

type TProps = {
  src: string;
  name: string;
  alt?: string;
};

export const UserAvatar: FC<TProps> = memo((props) => {
  const { name, src, alt } = props;
  return (
    <Avatar>
      <AvatarImage src={src} alt={alt ? alt : 'use image'} />
      <AvatarFallback>{name}</AvatarFallback>
    </Avatar>
  );
});
