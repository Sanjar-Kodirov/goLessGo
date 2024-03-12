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
