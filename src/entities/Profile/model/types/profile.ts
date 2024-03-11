import { Country } from '@/shared/const/common';

export interface Profile {
  id: number;
  email: string;
  username: string;
  age: number;
  avatar: string;
  country: Country;
  city: string;
}

export interface ProfileSchema {
  data: any;
  isLoading: boolean;
  error?: string;
  readonly: boolean;
  _inited: boolean;
}
