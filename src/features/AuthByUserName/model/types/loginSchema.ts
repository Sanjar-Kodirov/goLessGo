export interface LoginSchema {
  username: string;
  password: string;
  isLoading: boolean;
  error?: string;
  success?: boolean;
}

export interface ILoginResponse {
  token: string;
}

export interface User {
  id: number;
  email: string;
  username: string;
  age: number;
  country: string;
  city: string;
  avatar: string;
}
