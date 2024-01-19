import { Suspense } from 'react';

import { Outlet } from 'react-router-dom';

import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';

const MainLayout = () => {
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
    </div>
  );
};

export default MainLayout;
