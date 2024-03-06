export interface User {
  id: string;
  username: string;
}

export interface ILoginResponse {
  token: string;
}

export interface UserSchema {
  authData?: User;
}
