import React from "react";
import "./Styles.css";
import Stud from "./assets/goals.jpg";

const MainStudents = () => {
  return (
    <>
      <div className="w-100">
        <div className="bluediv"></div>
        <div className="content-div-main h-100">
          <div className="container">
            <div className="banner position-relative">
              <img
                src={Stud}
                alt="Goals Banner"
                className="img-fluid banner-img"
              />
              <div className="glass-effect d-flex justify-content-center align-items-center">
                <button className="btn text-white"><h3>View All Students</h3></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainStudents;
