import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Sidebar from "./Sidebar";
import Band from "./assets/freepik.jpg";
import "./Styles.css";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { imagedb } from "../Config/firebase";
import axios from "axios";

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

const Addstudents = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [uploadCompleted, setUploadCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

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
        } catch (error) {
          console.error("Error getting download URL:", error);
          setLoading(false);
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
          const response = await axios.post(
            `http://localhost:4550/details/create-students`,
            values
          );

          console.log("Student saved:", response.data);

          resetForm();
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
  };

  return (
    <div className="d-flex">
      <div className="w-25">
        <Sidebar />
      </div>
      <div className="w-75">
        <div className="banner blur">
          <img className="tops" src={Band} alt="Student banner" />
          <div className="form-container">
            <h2 className=" text-light text-center">Add Student</h2>
            <form onSubmit={formik.handleSubmit}>
              <div className="row mb-3 mt-4 text-white">
                <div className="col-md-4 text-white">
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

              <div className="row mb-4 text-white">
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

              <div className="mb-3 w-50 text-white">
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
                />
                {formik.touched.image && formik.errors.image ? (
                  <div className="text-danger">{formik.errors.image}</div>
                ) : null}
              </div>

              <button
                type="submit"
                className="btn btn-primary mt-3"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
        {/* {uploadCompleted && imageFileUrl && (
          <div className="mt-4">
            <h4>Uploaded Image:</h4>
            <img
              src={imageFileUrl}
              alt="Uploaded"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Addstudents;
