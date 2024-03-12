import classNames from 'classnames';
import { ExternalLink, ThumbsUp } from 'lucide-react';

import { memo } from 'react';

import { AvatarUI } from '@/shared/ui/Avatar';
import { Button } from '@/shared/ui/Button';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import Text, { TextType } from '@/shared/ui/Text/Text';

import { Comment } from '../../model/types/comment';
import cls from './CommentCard.module.scss';

interface CommentCardProps {
  className?: string;
  comment: Comment;
  isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
  const { className, comment, isLoading } = props;

  if (isLoading) {
    return (
      <div className={classNames(cls.CommentCard, {}, [className])}>
        <div className={cls.header}>
          <Skeleton className="w-10 h-10 rounded-full" />
          <Skeleton className="w-full h-10 ml-2" />
        </div>
        <Skeleton className="w-full h-4 mt-2" />
      </div>
    );
  }

  return (
    <div className={classNames(cls.CommentCard, {}, [className])}>
      <div className={classNames(cls.commentInner)}>
        {comment.user.avatar ? (
          <AvatarUI size="md" className="mr-2" src={comment.user.avatar} />
        ) : null}
        <div className={cls.commentText}>
          <div className={cls.commentTitle}>
            <Text type={TextType.BOLD} text={comment.user.username} />
            <span>3 days ago</span>
          </div>
          <div className={cls.text}>
            <Text type={TextType.MUTED} text={comment.text} />
          </div>
          <Button variant="ghost" className="px-1 ml-1">
            <ExternalLink className="w-5 h-5 ml-2 text-gray-600 cursor-pointer  hover:text-gray-900" />
          </Button>
          <Button variant="ghost" className="px-1 ml-1">
            <ThumbsUp className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-700" />
          </Button>
        </div>
      </div>
    </div>
  );
});
