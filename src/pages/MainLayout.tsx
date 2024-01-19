import { Navbar } from "@/widgets/Navbar";
import { Outlet } from "react-router-dom";
import { Sidebar } from "@/widgets/Sidebar";
import { Suspense } from "react";
const MainLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default MainLayout;
