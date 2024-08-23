import React from "react";
import "./Styles.css";
import Stud from "./assets/classroom.jpg";

const MainStudents = () => {
  return (
    <>
      <div className="w-100">
        <div className="content-div-main vh-100">
          <div className="container vh-100">
            <div className="banner-div position-relative vh-100">
              <img
                src={Stud}
                alt="Goals Banner"
                className=" banner-img vh-100"
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
