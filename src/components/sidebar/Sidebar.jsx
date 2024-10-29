import React from "react";
import { useStateContext } from "../../context/ContextProvider";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import { LogOut, Store } from "lucide-react";
import { Tooltip } from "antd";
import { links } from "../../data/dummy";
import { useAuth } from "../../context/Authcontext";
const Sidebar = () => {
  const nav = useNavigate();
  const { activeMenu, setActiveMenu, screenSize } =
    useStateContext();
  const { logout, isAuthenticated } = useAuth();
  const handleCloseSideBar = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false);
    }
  };
  const handlelogout = async () => {
    await logout();
    nav("/auth/login");
  };
  const activelink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-black text-md m-2";
  const normallink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md m-2 text-white hover:bg-white/5";
  return (
    <div
      className="mx-2 h-screen md:overflow-hidden overflow-auto
        md:hover:overflow-auto pb-10"
    >
      {activeMenu && (
        <>
          {/* //! navbar heading div */}
          <div className="flex-center gap-16">
            <Link
              to="/"
              onClick={handleCloseSideBar}
              className=" flex items-center gap-3 ml-3   mt-4 text-xl font-extrabold tracking-tight text-white"
            >
              <Store />
              <span>FeedSphere</span>
            </Link>
            <Tooltip title="Close" placement="bottom">
              <button
                type="button"
                onClick={() => {
                  setActiveMenu((prevActiveMenu) => !prevActiveMenu);
                }}
                className="text-xl rounded-full p-3 hover:bg-white/5 
mt-4 block md:hidden"
              >
                <MdOutlineCancel className="text-white" />
              </button>
            </Tooltip>
          </div>

          {/* //! mainmenu  div  */}
          <div className="mt-8">
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 m-3 mt-4 uppercase">{item.title}</p>
                {item.links.map((link) => (
                  <div className={link.className} key={link.name}>
                    <NavLink
                      to={`/dashbord/${link.name}`}
                      key={link.name}
                      style={({ isActive }) => ({
                        background: isActive ? "#FFFFFf" : "",
                      })}
                      className={({ isActive }) =>
                        isActive ? activelink : normallink
                      }
                      onClick={handleCloseSideBar}
                    >
                      <link.icon size={20} />
                      <span className="capitalize">{link.name}</span>
                    </NavLink>
                  </div>
                ))}
              </div>
            ))}
            {isAuthenticated ? (
              <div className="relative cursor-pointer" onClick={handlelogout}>
                <div className="flex-center gap-x-4 group/menubox px-2.5 py-6">
                  <div
                    className="bg-white/5 w-fit p-2 rounded-md
              group-hover/menubox:bg-white group-hover/menubox:text-gray-900 duration-300"
                  >
                    <LogOut />
                  </div>
                  <div>
                    <h6 className="font-semibold">Logout</h6>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
