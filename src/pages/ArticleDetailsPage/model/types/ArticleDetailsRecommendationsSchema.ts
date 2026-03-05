import { Article } from '@/entities/Article';
import { EntityState } from '@reduxjs/toolkit';

export interface ArticleDetailsRecommendationsSchema
  extends EntityState<Article, number> {
  isLoading?: boolean;
  error?: string;
}
