import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import "./Styles.css";
import Pagination from "./Pagination ";

const Viewallstudents = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [studentsPerPage] = useState(5); // Number of students per page

  const allStudents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4550/details/get-all-students"
      );
      setStudents(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allStudents();
  }, []);

  // Get current students
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="d-flex">
      <div className="w-25">
        <Sidebar />
      </div>
      <div className="w-75">
        <table className="table table-bordered text-center">
          <thead>
            <tr>
              <th  className="table-row" scope="col">Student Image</th>
              <th  className="table-row" scope="col">Student Name</th>
              <th  className="table-row" scope="col">Student Age</th>
              <th  className="table-row" scope="col">Student Class</th>
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
