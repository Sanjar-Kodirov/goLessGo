import { getArticleDetailsData } from '@/entities/Article/model/selectors/articleDetails';
import { getProfileData } from '@/entities/Profile';
import { createSelector } from '@reduxjs/toolkit';

export const getCanEditArticle = createSelector(
  getArticleDetailsData,
  getProfileData,
  (article, user) => {
    if (!article || !user) {
      return false;
    }

    return article.user.id === user.user.id;
  },
);
