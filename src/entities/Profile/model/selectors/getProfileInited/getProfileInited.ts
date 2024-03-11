import { StateSchema } from '@/app/providers/StoreProvider';

export const getProfileInited = (state: StateSchema) => state.profile?._inited;
