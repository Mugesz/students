import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Sidebar from "./Sidebar";
import Band from "./assets/school-stud.jpg";
import "./Styles.css";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { imagedb } from "../Config/firebase";

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

  if (!values.fathersName) {
    errors.fathersName = "Required";
  }

  if (!values.mothersName) {
    errors.mothersName = "Required";
  }

  if (!values.className) {
    errors.className = "Required";
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
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setLoading(true); // Set loading to true during upload
      },
      (error) => {
        console.error("Error uploading image:", error);
        setLoading(false); // Stop loading on error
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setImageFileUrl(downloadURL);
          setUploadCompleted(true);
          setLoading(false); // Stop loading once upload is complete
        } catch (error) {
          console.error("Error getting download URL:", error);
          setLoading(false); // Stop loading on error
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
      fathersName: "",
      mothersName: "",
      className: "",
      image: null,
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      console.log("Form Data: ", values);
      resetForm();
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
      <div className="w-75 p-4" style={{ backgroundColor: "#d9d9d9" }}>
        <div className="banner">
          <img className="tops" src={Band} alt="" />
        </div>
        <h2>Add Student</h2>
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

          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="fathersName" className="form-label">
                Father's Name <span className="text-danger">*</span>
              </label>
              <input
                id="fathersName"
                name="fathersName"
                type="text"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fathersName}
              />
              {formik.touched.fathersName && formik.errors.fathersName ? (
                <div className="text-danger">{formik.errors.fathersName}</div>
              ) : null}
            </div>

            <div className="col-md-4">
              <label htmlFor="mothersName" className="form-label">
                Mother's Name <span className="text-danger">*</span>
              </label>
              <input
                id="mothersName"
                name="mothersName"
                type="text"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.mothersName}
              />
              {formik.touched.mothersName && formik.errors.mothersName ? (
                <div className="text-danger">{formik.errors.mothersName}</div>
              ) : null}
            </div>

            <div className="col-md-4">
              <label htmlFor="className" className="form-label">
                Class <span className="text-danger">*</span>
              </label>
              <input
                id="className"
                name="className"
                type="text"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.className}
              />
              {formik.touched.className && formik.errors.className ? (
                <div className="text-danger">{formik.errors.className}</div>
              ) : null}
            </div>
          </div>

          <div className="mb-3 w-25">
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

          {loading ? (
            <div className="mb-3">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Uploading...</span>
              </div>
              <span className="ms-2">Uploading image...</span>
            </div>
          ) : null}

          <button type="submit" className="btn btn-primary" disabled={loading}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addstudents;
