import { ArticleDetailsResponseModel } from './article';

export interface ArticleDetailsSchema {
  isLoading: boolean;
  error?: string;
  data?: ArticleDetailsResponseModel;
}
