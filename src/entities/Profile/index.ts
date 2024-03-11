export type { Profile, ProfileSchema } from './model/types/profile';

export { profileActions, profileReducer } from './model/slice/profileSlice';

export { fetchProfileData } from './model/services/fetchProfileData/fetchProfileData';
export { getProfileIsLoading } from './model/selectors/getProfileIsLoading/getProfileIsLoading';
export { getProfileData } from './model/selectors/getProfileData/getProfileData';
export { getProfileInited } from './model/selectors/getProfileInited/getProfileInited';

export { ProfileCard } from './ui/ProfileCard/ProfileCard';
