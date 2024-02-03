import { ICountry, ICurrency } from '@/shared/const/common';

export interface IProfile {
  id: number;
  username: string;
  email: string;
  age: number;
  avatar: string;
  country: ICountry;
  city: string;
}

export interface IProfileSchema {
  data?: IProfile;
  isLoading: boolean;
  error?: string;
  readonly: boolean;
}
