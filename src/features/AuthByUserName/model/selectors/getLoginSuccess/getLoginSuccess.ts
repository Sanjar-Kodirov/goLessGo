import { StateSchema } from '@/app/providers/StoreProvider';

export const getLoginSuccess = (state: StateSchema) =>
  state?.loginForm?.success || false;
