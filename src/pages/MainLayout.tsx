import { Suspense, useEffect } from 'react';

import { Outlet } from 'react-router-dom';

import { fetchProfileData } from '@/entities/Profile';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { Toaster } from '@/shared/ui/Notification/SonnerUI';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';

const MainLayout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProfileData());
  }, []);

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

// todo: user folder not working at all need to be removed in case of the using
