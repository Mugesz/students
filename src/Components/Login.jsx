import React, { useEffect } from "react";
import { useAuth } from "./Context/useAuth";
import { useNavigate } from "react-router-dom";
import "./Styles.css";
import Male from "../Components/assets/male 1.svg";
import Stud from "../Components/assets/school-stud.jpg";

const Login = () => {
  const { isLoggedIn, googleLogin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="container-fluid h-100 p-0 login">
      <div className="login-custom d-flex vh-100 m-0">
        <div className="p-0 d-flex flex-column justify-content-center align-items-center bg-clr text-white">
          <img src={Male} alt="Male Icon" className="mb-3" />
          <h4>Student Registration System</h4>
        </div>
        <div className=" d-flex flex-column justify-content-center align-items-center p-5">
          <div className="text-center">
            <img src={Stud} alt="Student" className="img-fluid mb-4" />
            <button onClick={googleLogin} className="btn bg-button text-white d-block mx-auto">
              Login with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
