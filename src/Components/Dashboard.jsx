import React from "react";
import MainStudents from "./MainStudents";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <div className=" d-flex">
      <div className="w-25">
        <Sidebar />
      </div>
      <div className="w-75">
        {" "}
        <MainStudents />
      </div>
    </div>
  );
};

export default Dashboard;

{
  /* <h3>Welcome, {userData.displayName}</h3>
      <img src={userData.photoURL} alt="User Profile" />
      <p>{userData.email}</p>
      <button onClick={handleLogout}>Logout</button> */
}
