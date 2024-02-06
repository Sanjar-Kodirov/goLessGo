import { useSelector } from 'react-redux';

import { FC, useEffect } from 'react';

import { fetchProfileData, profileReducer } from '@/entities/Profile';
import { getProfileData } from '@/entities/Profile/model/selectors/getProfileData/getProfileData';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useDynamicModuleLoader } from '@/shared/lib/hooks/useDynamicModuleLoader';

const ProfilePage: FC = () => {
  const dispatch = useAppDispatch();
  const profileData = useSelector(getProfileData);
  console.log('profileData', profileData);
  useDynamicModuleLoader('profile', profileReducer, true);

  useEffect(() => {
    dispatch(fetchProfileData());
  }, [dispatch]);

  return <div>ProfilePage</div>;
};

export default ProfilePage;
