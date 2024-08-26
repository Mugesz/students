import React, { useEffect, useState, useRef } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { imagedb } from "../Config/firebase";
import { config } from "../Api";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import Band from "./assets/freepik.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Styles.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Required";
  } else if (values.name.length > 50) {
    errors.name = "Must be 50 characters or less";
  }

  if (!values.age) {
    errors.age = "Required";
  } else if (!/^\d+$/.test(values.age)) {
    errors.age = "Age must be a number";
  }

  if (!values.mobile) {
    errors.mobile = "Required";
  } else if (!/^\d{10}$/.test(values.mobile)) {
    errors.mobile = "Mobile number must be 10 digits";
  }

  if (!values.fathers) {
    errors.fathers = "Required";
  }

  if (!values.mothers) {
    errors.mothers = "Required";
  }

  if (!values.class) {
    errors.class = "Required";
  }

  if (!values.image) {
    errors.image = "Required";
  } else if (values.image.size > 1024 * 1024) {
    errors.image = "File size must be less than 1MB";
  } else if (
    !["image/jpeg", "image/png", "image/gif"].includes(values.image.type)
  ) {
    errors.image = "Only JPG, PNG, and GIF files are allowed";
  }

  return errors;
};

const Editstudents = () => {
  const { id } = useParams(); 
  const [studentData, setStudentData] = useState(null); 
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [uploadCompleted, setUploadCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null); 
  const fileInputRef = useRef(null);

  const fetchStudentData = async () => {
    try {
      const response = await axios.get(
        `${config.Api}/details/get-one-students/${id}`
      );
      setStudentData(response.data);
      formik.setValues({
        name: response.data.name || "",
        age: response.data.age || "",
        mobile: response.data.mobile || "",
        fathers: response.data.fathers || "",
        mothers: response.data.mothers || "",
        class: response.data.class || "",
        image: response.data.image || null,
      });

    
      if (response.data.image) {
        setPreviewUrl(response.data.image);
      }
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  useEffect(() => {
    fetchStudentData(); 
  }, [id]);

  const uploadImage = async () => {
    const storageRef = ref(imagedb, new Date().getTime() + imageFile.name);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setLoading(true);
      },
      (error) => {
        console.error("Error uploading image:", error);
        setLoading(false);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setImageFileUrl(downloadURL);
          setUploadCompleted(true);
          setLoading(false);
          toast.success("Student Edited successfully!");
        } catch (error) {
          console.error("Error getting download URL:", error);
          setLoading(false);
          toast.error("Failed to Edit students.");
        }
      }
    );
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      mobile: "",
      fathers: "",
      mothers: "",
      class: "",
      image: null,
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);
        if (uploadCompleted) {
          values.image = imageFileUrl;
          const response = await axios.put(
            `${config.Api}/details/edit-students/${id}`,
            values
          );
          console.log("Student updated:", response.data);
          resetForm();
          setImageFile(null);
          setPreviewUrl(null);
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        } else {
          console.error("Image upload not completed yet");
          alert("Please wait until the image upload is complete.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleImageChange = (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue("image", file);
    setImageFile(file);

    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    } else {
      setPreviewUrl(null); 
    }
  };

 
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl); 
      }
    };
  }, [previewUrl]);

  return (
    <div className="container-fluid d-flex">
      <div className="sidebar w-25">
        <Sidebar />
      </div>
      <div className="mobile-custom w-75 position-relative">
        <div className="banner">
          <img className="img-fluid" src={Band} alt="Student banner" />
          <div className="form-container text-light p-4 rounded">
            <h2 className="text-center">Edit Student</h2>
            <form onSubmit={formik.handleSubmit}>
              <div className="row mb-3 mt-4">
                <div className="col-md-4">
                  <label htmlFor="name" className="form-label">
                    Name <span className="text-danger">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="text-danger">{formik.errors.name}</div>
                  ) : null}
                </div>

                <div className="col-md-4">
                  <label htmlFor="age" className="form-label">
                    Age <span className="text-danger">*</span>
                  </label>
                  <input
                    id="age"
                    name="age"
                    type="text"
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.age}
                  />
                  {formik.touched.age && formik.errors.age ? (
                    <div className="text-danger">{formik.errors.age}</div>
                  ) : null}
                </div>

                <div className="col-md-4">
                  <label htmlFor="mobile" className="form-label">
                    Mobile <span className="text-danger">*</span>
                  </label>
                  <input
                    id="mobile"
                    name="mobile"
                    type="text"
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.mobile}
                  />
                  {formik.touched.mobile && formik.errors.mobile ? (
                    <div className="text-danger">{formik.errors.mobile}</div>
                  ) : null}
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-md-4">
                  <label htmlFor="fathers" className="form-label">
                    Father's Name <span className="text-danger">*</span>
                  </label>
                  <input
                    id="fathers"
                    name="fathers"
                    type="text"
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.fathers}
                  />
                  {formik.touched.fathers && formik.errors.fathers ? (
                    <div className="text-danger">{formik.errors.fathers}</div>
                  ) : null}
                </div>

                <div className="col-md-4">
                  <label htmlFor="mothers" className="form-label">
                    Mother's Name <span className="text-danger">*</span>
                  </label>
                  <input
                    id="mothers"
                    name="mothers"
                    type="text"
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.mothers}
                  />
                  {formik.touched.mothers && formik.errors.mothers ? (
                    <div className="text-danger">{formik.errors.mothers}</div>
                  ) : null}
                </div>

                <div className="col-md-4">
                  <label htmlFor="class" className="form-label">
                    Class <span className="text-danger">*</span>
                  </label>
                  <input
                    id="class"
                    name="class"
                    type="text"
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.class}
                  />
                  {formik.touched.class && formik.errors.class ? (
                    <div className="text-danger">{formik.errors.class}</div>
                  ) : null}
                </div>
              </div>

              <div className="mb-3 col-md-6">
                <label htmlFor="image" className="form-label">
                  Image <span className="text-danger">*</span>
                </label>
                <input
                  id="image"
                  name="image"
                  type="file"
                  className="form-control"
                  onChange={handleImageChange}
                  onBlur={formik.handleBlur}
                  ref={fileInputRef}
                />
                {formik.touched.image && formik.errors.image ? (
                  <div className="text-danger">{formik.errors.image}</div>
                ) : null}

                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt="Image preview"
                    className="img-fluid mt-2 rounded"
                    style={{ maxHeight: "200px", objectFit: "contain" }}
                  />
                )}
              </div>

              <div className="text-center mt-4">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Student"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editstudents;
