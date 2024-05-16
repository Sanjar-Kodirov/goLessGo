import { Article } from '@/entities/Article';
import { ArticleView } from '@/entities/Article/model/types/article';
import { EntityState } from '@reduxjs/toolkit';

export interface ArticlesPageSchema extends EntityState<Article, string> {
  isLoading?: boolean;
  error?: string;

  view: ArticleView;

  // pagination
  limit?: number;
  page: number;
  hasMore: boolean;

  _inited: boolean;
}
