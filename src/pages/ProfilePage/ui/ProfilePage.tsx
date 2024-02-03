import { FC } from 'react';

import { profileReducer } from '@/entities/Profile';
import { useDynamicModuleLoader } from '@/shared/lib/hooks/useDynamicModuleLoader';

type TProps = {};
const ProfilePage: FC<TProps> = () => {
  useDynamicModuleLoader('profile', profileReducer, true);
  return <div>ProfilePage</div>;
};

export default ProfilePage;
