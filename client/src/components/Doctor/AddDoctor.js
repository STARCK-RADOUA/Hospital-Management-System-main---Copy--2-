import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorDialogueBox from "../MUIDialogueBox/ErrorDialogueBox";
import Box from "@mui/material/Box";
import axios from "axios";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../../firebase';
function Adddoctor() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [passwordMatchDisplay, setPasswordMatchDisplay] = useState("none");
  const [passwordValidationMessage, setPasswordValidationMessage] =
    useState("");
  const [errorDialogueBoxOpen, setErrorDialogueBoxOpen] = useState(false);
  const [errorList, setErrorList] = useState([]);
  const [departementList, setdepartementList] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [myImages, setMyImages] = useState([]);


  const handleDialogueOpen = () => {
    setErrorDialogueBoxOpen(true);
  };

  const handleDialogueClose = () => {
    setErrorList([]);
    setErrorDialogueBoxOpen(false);
  };

  const adddoctor = (event) => {
    event.preventDefault();
    const form = document.forms.adddoctorForm;
    let doctor = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      username: form.username.value,
      email: form.email.value,
      phone: form.phone.value,
      password: form.password.value,
      confirmPassword: form.confirmPassword.value,
      department: form.department.value,
      imageUrls : myImages ,
    };



    fetch("http://localhost:3001/doctors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(doctor),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        let respMessage = data.message;
        if (respMessage === "success") {
          navigate("/dash/doctors");
        } else {
          setErrorList(data.errors);
          handleDialogueOpen();
        }
      });
  };

  useEffect(() => {
    getDepartement();
  }, []);

  const getDepartement = async () => {
    try {
      const response = await axios.get("http://localhost:3001/departements");
      const departmentNames = response.data.map((dept) => dept.name); // Extract the names from the response
      setdepartementList(departmentNames);
      console.log("Departement List:", departmentNames);
    } catch (error) {
      setErrorList([error.message]);
      handleDialogueOpen();
    }
  };

  useEffect(() => {
    if (password.length > 0 && password.trim().length <= 6) {
      setPasswordValidationMessage(
        "Password Length must be greater than 6 characters"
      );
    } else {
      setPasswordValidationMessage("");
    }
    if (password === confirmPassword) {
      setPasswordMatchDisplay("none");
    } else {
      setPasswordMatchDisplay("block");
    }
  }, [password, confirmPassword]);





  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + myImages.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setMyImages(urls);
          setImageUploadError(false);
          setUploading(false);
          console("MyImagstate :" ,myImages ) ;
          console("MyUrls :" ,urls ) ;


        })
        .catch((err) => {
          setImageUploadError('Uploaded');
          setUploading(false);
        });
    } else {
      setImageUploadError('You can only upload 6 images per listing');
      setUploading(false);
    }
  };


  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setMyImages(myImages.filter((_, i) => i !== index));
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <div className="page-wrapper">
        <div className="content">
          <div className="card-box">
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <h4 className="page-title">Add Doctor</h4>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <form
                  id="adddoctorForm"
                  name="adddoctorForm"
                  onSubmit={adddoctor}
                >
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          Prénom <span className="text-danger">*</span>
                        </label>
                        <input
                          name="firstName"
                          className="form-control"
                          type="text"
                          required
                          value={firstName}
                          onChange={(event) => setFirstName(event.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Nom</label>
                        <input
                          name="lastName"
                          className="form-control"
                          type="text"
                          required
                          value={lastName}
                          onChange={(event) => setLastName(event.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          Username <span className="text-danger">*</span>
                        </label>
                        <input
                          name="username"
                          className="form-control"
                          type="text"
                          required
                          value={username}
                          onChange={(event) => setUsername(event.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          Email <span className="text-danger">*</span>
                        </label>
                        <input
                          name="email"
                          className="form-control"
                          type="email"
                          required
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Password</label>
                        <input
                          name="password"
                          className="form-control"
                          type="password"
                          required
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                          name="confirmPassword"
                          className="form-control"
                          type="password"
                          required
                          value={confirmPassword}
                          onChange={(event) =>
                            setConfirmPassword(event.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Telephone </label>
                        <input
                          name="phone"
                          className="form-control"
                          type="text"
                          value={phone}
                          onChange={(event) => setPhone(event.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Département</label>
                        <select
                          name="department"
                          className="form-select"
                          value={department}
                          onChange={(event) =>
                            setDepartment(event.target.value)
                          }
                        >
                          {departementList.map((dept, index) => (
                            <option key={index} value={dept}>
                              {dept}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>




                  <div className="flex flex-col flex-1 gap-4">
                    <p className="font-semibold">
                      Images:
                      <span className="font-normal text-gray-600 ml-2">
                        The first image will be the cover (max 6)
                      </span>
                    </p>
                    <div className="flex gap-4">
                      <input
                        onChange={(e) => setFiles(e.target.files)}
                        className="p-3 border border-gray-300 rounded w-full"
                        type="file"
                        id="images"
                        accept="image/*"
                        multiple
                      />
                      <button
                        type="button"
                        disabled={uploading}
                        onClick={handleImageSubmit}
                        className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
                      >
                        {uploading ? "Uploading..." : "Upload"}
                      </button>
                    </div>
                    <p className="text-red-700 text-sm">
                      {imageUploadError && imageUploadError}
                    </p>
                    {myImages.length > 0 &&
                      myImages.map((url, index) => (
                        <div
                          key={url}
                          className="flex justify-between p-3 border items-center"
                        >
                          <img
                            src={url}
                            alt="listing image"
                            className="w-20 h-20 object-contain rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                    
                    {error && <p className="text-red-700 text-sm">{error}</p>}
                  </div>





                  <div className="m-t-20 text-center">
                    <button
                      id="adddoctor"
                      type="submit"
                      className="btn btn-primary submit-btn"
                    >
                      Create Doctor
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <ErrorDialogueBox
          open={errorDialogueBoxOpen}
          handleToClose={handleDialogueClose}
          ErrorTitle="Error: Add doctor"
          ErrorList={errorList}
        />
      </div>
    </Box>
  );
}

export default Adddoctor;
