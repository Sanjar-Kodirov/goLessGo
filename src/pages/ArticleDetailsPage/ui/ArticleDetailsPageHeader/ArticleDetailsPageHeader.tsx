import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { memo, useCallback } from 'react';

import { useNavigate } from 'react-router-dom';

import { getArticleDetailsData } from '@/entities/Article/model/selectors/articleDetails';
import { RoutePath } from '@/shared/config/routeConfig/routes';
import { Button } from '@/shared/ui/Button';

import { getCanEditArticle } from '../../model/selectors/article';
import cls from './ArticleDetailsPageHeader.module.scss';

interface ArticleDetailsPageHeaderProps {
  className?: string;
}

export const ArticleDetailsPageHeader = memo(
  (props: ArticleDetailsPageHeaderProps) => {
    const { className } = props;
    const navigate = useNavigate();
    const canEdit = useSelector(getCanEditArticle);
    const article = useSelector(getArticleDetailsData);

    console.log('canEdit', canEdit);

    const onBackToList = useCallback(() => {
      navigate(RoutePath.articles);
    }, [navigate]);

    const onEditArticle = useCallback(() => {
      navigate(`${RoutePath.article_details}/${article?.id}/edit`);
    }, [article?.id, navigate]);

    return (
      <div
        className={classNames(cls.ArticleDetailsPageHeader, {}, [className])}
      >
        <Button variant="outline" onClick={onBackToList}>
          Назад к списку
        </Button>
        {canEdit && (
          <Button
            className={cls.editBtn}
            variant="default"
            onClick={onEditArticle}
          >
            Редактировать
          </Button>
        )}
      </div>
    );
  },
);
