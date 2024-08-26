import axios from "axios";
import React, { useEffect, useState } from "react";
import { config } from "../Api";
import { Link, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";

const Viewonestudents = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  const oneStudent = async () => {
    try {
      const response = await axios.get(
        `${config.Api}/details/get-one-students/${id}`
      );
      setStudent(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    oneStudent();
  }, [id]);

  return (
    <div className="d-flex flex-column flex-md-row">
      <div className="w-25 sidebar">
        <Sidebar />
      </div>
      <div className="w-75 mobile-custom  p-4">
        <div className="container bg-light p-4 rounded shadow-sm">
          {student ? (
            <>
              <div className="d-flex flex-column flex-md-row justify-content-center align-items-center mb-4">
                <div
                  className="text-center bg-white border border-success rounded p-3"
                  style={{ maxWidth: "300px", flex: "1 0 auto" }}
                >
                  <h5>Student Image</h5>
                  <img
                    src={student.image}
                    alt="student image"
                    className="img-fluid rounded-circle border border-primary"
                    style={{ height: "200px", width: "200px" }}
                  />
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-12 col-md-4 mb-3 mb-md-0">
                  <div className="bg-white border border-success p-3 rounded shadow-sm">
                    <p>Student Name</p>
                    <h5>{student.name}</h5>
                  </div>
                </div>
                <div className="col-12 col-md-4 mb-3 mb-md-0">
                  <div className="bg-white border border-success p-3 rounded shadow-sm">
                    <p>Student Age</p>
                    <h5>{student.age}</h5>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="bg-white border border-success p-3 rounded shadow-sm">
                    <p>Student Class</p>
                    <h5>{student.class}</h5>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12 col-md-4 mb-3 mb-md-0">
                  <div className="bg-white border border-success p-3 rounded shadow-sm">
                    <p>Father Name</p>
                    <h5>{student.fathers}</h5>
                  </div>
                </div>
                <div className="col-12 col-md-4 mb-3 mb-md-0">
                  <div className="bg-white border border-success p-3 rounded shadow-sm">
                    <p>Mother Name</p>
                    <h5>{student.mothers}</h5>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="bg-white border border-success p-3 rounded shadow-sm">
                    <p>Mobile number</p>
                    <h5>{student.mobile}</h5>
                  </div>
                </div>
              </div>
              <div className=" d-flex justify-content-between">
                <Link to={`/edit-students/${id}`}>
                  <button className="btn btn-warning mt-3">Edit</button>
                </Link>

                <Link to={"/All-students"}>
                  <button className="btn btn-outline-warning mt-3">Back</button>
                </Link>
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Viewonestudents;
