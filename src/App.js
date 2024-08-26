import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Components/Context/useAuth";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import ProtectedRoute from "./Components/ProtectedRoute";
import Addstudents from "./Components/Addstudents";
import Viewonestudents from "./Components/Viewonestudents";
import Viewallstudents from "./Components/Viewallstudents";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Editstudents from "./Components/Editstudents";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/add-students" element={<Addstudents />} />
            <Route
              path="/view-one-students/:id"
              element={<Viewonestudents />}
            />
            <Route path="/All-students" element={<Viewallstudents />} />
            <Route path="/edit-students/:id" element={<Editstudents />} />
          </Routes>
        </AuthProvider>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="coloured"
        transition={Bounce}
      />
    </>
  );
}

export default App;
