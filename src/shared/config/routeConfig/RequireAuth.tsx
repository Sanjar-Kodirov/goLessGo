import { useSelector } from 'react-redux';

import { Navigate, useLocation } from 'react-router-dom';

import { getProfileData } from '@/entities/Profile/model/selectors/getProfileData/getProfileData';

import { RoutePath } from './routes';

export function RequireAuth({
  redirect = true,
  children,
}: {
  redirect?: boolean;
  children: JSX.Element;
}) {
  const profileData = useSelector(getProfileData);
  const location = useLocation();

  if (!profileData?.user) {
    if (redirect) {
      return (
        <Navigate to={RoutePath.main} state={{ from: location }} replace />
      );
    }

    return null;
  }

  return children;
}
