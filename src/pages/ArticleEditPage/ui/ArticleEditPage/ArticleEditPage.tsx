import classNames from 'classnames';

import { memo } from 'react';

import { useParams } from 'react-router-dom';

import { ContentUI } from '@/widgets/Content/ContentUI';

import cls from './ArticleEditPage.module.scss';

interface ArticleEditPageProps {
  className?: string;
}

const ArticleEditPage = memo((props: ArticleEditPageProps) => {
  const { className } = props;
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);

  return (
    <ContentUI className={classNames(cls.ArticleEditPage, {}, [className])}>
      {isEdit ? 'Редактирование статьи с ID = ' + id : 'Создание новой статьи'}
    </ContentUI>
  );
});

export default ArticleEditPage;
