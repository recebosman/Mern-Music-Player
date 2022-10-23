import React from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <div className="p-5 w-full bg-gradient-to-t from-gray-900 to-gray-800">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-white text-2xl font-bold flex items-center">
            Music Player.
            <i className="ri-album-fill p-1 "></i>
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <h1 className="text-white text-2xl font-thin flex items-center">
            {user ? user?.data.username : "User"}
          </h1>
          <i
            className="ri-logout-box-r-line text-xl text-white"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.reload();
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
