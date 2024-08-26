import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import "./Styles.css";
import Pagination from "./Pagination ";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrashArrowUp } from "@fortawesome/free-solid-svg-icons";
import { config } from "../Api";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Viewallstudents = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(5);

  const allStudents = async () => {
    try {
      const response = await axios.get(
        `${config.Api}/details/get-all-students`
      );
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error("Failed to fetch students.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${config.Api}/details/delete-students/${id}`);
      setStudents(students.filter((student) => student._id !== id));
      toast.success("Student deleted successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete student.");
    }
  };

  useEffect(() => {
    allStudents();
  }, []);
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="d-flex">
      <div className="w-25 sidebar">
        <Sidebar />
      </div>
      <div className="w-75 mobile-custom">
        <table className="table table-bordered text-center">
          <thead>
            <tr>
              <th className="table-row" scope="col">
                Student Image
              </th>
              <th className="table-row" scope="col">
                Student Name
              </th>
              <th className="table-row" scope="col">
                Student Age
              </th>
              <th className="table-row" scope="col">
                Student Class
              </th>
              <th className="table-row" scope="col">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.map((item, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={item.image}
                    alt="student image"
                    height="80px"
                    width="80px"
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{item.class}</td>
                <td>
                  <Link to={`/view-one-students/${item._id}`}>
                    <button className="btn btn-secondary mx-2">
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                  </Link>

                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(item._id)}
                  >
                    <FontAwesomeIcon icon={faTrashArrowUp} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          studentsPerPage={studentsPerPage}
          totalStudents={students.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default Viewallstudents;
