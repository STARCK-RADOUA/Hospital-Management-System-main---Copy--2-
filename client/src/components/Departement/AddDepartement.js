import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ErrorDialogueBox from "../MUIDialogueBox/ErrorDialogueBox";
import Box from "@mui/material/Box";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../../firebase';

function AddDepartement() {
  const navigate = useNavigate();

  const [name, setname] = useState("");
  const [description, setDescripton] = useState("");
 
  const [errorDialogueBoxOpen, setErrorDialogueBoxOpen] = useState(false);
  const [errorList, setErrorList] = useState([]);
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

  const addDepartement = (event) => {
    event.preventDefault();
    // TODO: Handle patient form submission'
    const form = document.forms.addDepartementForm;
    let departement = {
      name: form.name.value,
      description: form.description.value,
      imageUrls : myImages ,
    };

    fetch("http://localhost:3001/Adepartements", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(departement),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        let respMessage = data.message;
        if (respMessage === "success") {
          navigate("/dash/departements");
        } else {
          //Display error message
          setErrorList(data.errors);
          handleDialogueOpen();
        }
      });
  };

  useEffect(() => {});


  
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
                <h4 className="page-title">Add Departement</h4>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <form
                  id="addDepartementForm"
                  name="addDepartementForm"
                  onSubmit={addDepartement}
                >
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <name>
                          name <span className="text-danger">*</span>
                        </name>
                        <input
                          name="name"
                          className="form-control"
                          type="text"
                          value={name}
                          onChange={(event) => setname(event.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <name>Description</name>
                        <input
                          name="description"
                          className="form-control"
                          type="text"
                          value={description}
                          onChange={(event) =>
                            setDescripton(event.target.value)
                          }
                        />
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
                      id="addDepartement"
                      type="submit"
                      className="btn btn-primary submit-btn"
                    >
                      Create Departement
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
          ErrorTitle="Error: Add Departement"
          ErrorList={errorList}
        />
      </div>
    </Box>
  );
}

export default AddDepartement;
