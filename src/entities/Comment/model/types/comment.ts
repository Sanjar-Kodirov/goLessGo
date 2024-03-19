import { User } from '@/entities/User';

export interface Comment {
  id: number;
  user: User;
  text: string;
}

export interface CreateComment {
  text: string;
  articleId: string;
  user: number;
}
