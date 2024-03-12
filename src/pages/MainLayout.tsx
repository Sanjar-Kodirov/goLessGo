import { useSelector } from 'react-redux';

import { Suspense, useEffect } from 'react';

import { Outlet } from 'react-router-dom';

import {
  fetchProfileData,
  getProfileInited,
  getProfileIsLoading,
} from '@/entities/Profile';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { Toaster } from '@/shared/ui/Notification/SonnerUI';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';

const MainLayout = () => {
  const dispatch = useAppDispatch();
  const profileIsLoading = useSelector(getProfileIsLoading);
  const profileInited = useSelector(getProfileInited);

  useEffect(() => {
    dispatch(fetchProfileData());
  }, []);

  if (!profileInited) {
    return null;
  }

  if (profileIsLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className=" flex-col h-screen">
      <Navbar />
      <div className="flex h-screen">
        <Sidebar />
        <div className="grow p-4">
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </div>
      </div>
      <Toaster />;
    </div>
  );
};

export default MainLayout;
