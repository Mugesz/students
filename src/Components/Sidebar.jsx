import React from "react";
import "./Styles.css";
import { useAuth } from "./Context/useAuth";
import Logo from "./assets/logo.svg";
import Log from "./assets/logout.svg";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { Logout } = useAuth();
  const handleLogout = () => {
    Logout();
  };
  return (
    <div className="mains w-25 position-fixed sidebar-bg vh-100 d-flex flex-column align-items-center">
      <div className="content-div w-100 text-center">
        <h5 className="text-white mt-2">Student Registration System</h5>
        <div className="imagediv d-flex justify-content-center mt-5">
          <img src={Logo} alt="Logo image" />
        </div>
        <div className="button-div d-flex flex-column mt-5 w-100">
          <button className="btn btn-primary btn-outline-light my-2 mx-auto w-75">
            Dashboard
          </button>
          <Link to={"/add-students"}>
            <button className="btn btn-primary btn-outline-light my-2 mx-auto w-75">
              Add Students
            </button>
          </Link>
        </div>
        <div
          className="logout-div d-flex gap-2 align-items-center justify-content-center mt-auto mb-4 h-50"
          onClick={handleLogout}
        >
          <img src={Log} alt="logout icon" />
          <h5 className="text-white ">
            <b>Sign out</b>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
