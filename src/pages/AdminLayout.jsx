import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { useStateContext } from "../context/ContextProvider";
import { Outlet } from "react-router-dom";
import Navbar from "../components/sidebar/Navbar";
const AdminLayout = () => {
  const { activeMenu } = useStateContext();
  return (
    <div className="flex relative">
      {/* //! sidebar  components  */}
      {activeMenu ? (
        <div className="w-72 fixed sidebar bg-black">
          <Sidebar />
        </div>
      ) : (
        <div className="w-0">SideBar</div>
      )}
      {/* //!navbar components  */}
      <div
        className={
          activeMenu
            ? "min-h-screen  lg:ml-72 w-full"
            : "bg-main-bg w-full min-h-screen flex-2"
        }
      >
        <div className="fixed md:static bg-black shadow-sm dark:bg-main-dark-bg navbar w-full">
          <Navbar className="navbarinfo" />
        </div>
        <div className="pt-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
