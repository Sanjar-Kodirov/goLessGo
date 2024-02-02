import { FC, memo } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

type TProps = {
  src: string;
  name: string;
  alt?: string;
};

export const UserAvatar: FC<TProps> = memo((props) => {
  const { name, src, alt } = props;
  return (
    <Avatar className="w-10 h-10 border rounded-full overflow-hidden">
      <AvatarImage src={src} alt={alt ? alt : 'use image'} />
      <AvatarFallback>{name}</AvatarFallback>
    </Avatar>
  );
});
