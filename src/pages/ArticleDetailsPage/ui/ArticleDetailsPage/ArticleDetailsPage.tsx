import classNames from 'classnames';

import { memo } from 'react';

import { useParams } from 'react-router-dom';

import { ArticleDetails } from '@/entities/Article';
import { CommentList } from '@/entities/Comment';
import Text, { TextTheme, TextType } from '@/shared/ui/Text/Text';

import cls from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
  className?: string;
}

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
  const { className } = props;
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        Статья не найдена
      </div>
    );
  }

  return (
    <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
      <ArticleDetails id={id} />
      <Text type={TextType.H4} text="Комментарии" />
      <CommentList
        comments={[
          {
            id: 1,
            text: "Very cool! I'll have to learn more about Tailwind.",
            user: {
              id: 1,
              username: 'Iktiyor',
              avatar: 'https://i.pravatar.cc/300',
            },
          },
          {
            id: 2,
            text: "Very cool! I'll have to learn more about Tailwind.",
            user: {
              id: 1,
              username: 'Dilshod',
              avatar: 'https://i.pravatar.cc/300',
            },
          },
          {
            id: 3,
            text: "Very cool! I'll have to learn more about Tailwind.",
            user: {
              id: 1,
              username: 'Qodirali',
              avatar: 'https://i.pravatar.cc/300',
            },
          },
        ]}
      />
    </div>
  );
};

export default memo(ArticleDetailsPage);
