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
import { Spinner } from '@/shared/ui/Spinner/Spinner';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';

const MainLayout = () => {
  const dispatch = useAppDispatch();
  const profileIsLoading = useSelector(getProfileIsLoading);
  const profileInited = useSelector(getProfileInited);

  useEffect(() => {
    dispatch(fetchProfileData());
  }, []);

  if (!profileInited || profileIsLoading) {
    return (
      <h1 className="flex items-center justify-center h-screen">
        <Spinner size="xLarge" />
      </h1>
    );
  }

  return (
    <div className="flex-col h-screen overflow-hidden">
      <Navbar />
      <div
        className="flex overflow-hidden"
        style={{ height: 'calc(100vh - 60px)' }}
      >
        <Sidebar />
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-full w-full">
              <Spinner size="large" />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </div>
      <Toaster />
    </div>
  );
};

export default MainLayout;
