import React from "react";
import MainStudents from "./MainStudents";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <div className=" d-flex">
      <div className="w-25 sidebar">
        <Sidebar />
      </div>
      <div className="w-75 mobile-custom">
        {" "}
        <MainStudents />
      </div>
    </div>
  );
};

export default Dashboard;
