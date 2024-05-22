import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import ErrorDialogueBox from "../MUIDialogueBox/ErrorDialogueBox";
import axios from "axios";
import Box from "@mui/material/Box";
//ss

function EditDepartement() {
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [description, setLastName] = useState("");

  const { id } = useParams();

  const [errorDialogueBoxOpen, setErrorDialogueBoxOpen] = useState(false);
  const [errorList, setErrorList] = useState([]);
  const handleDialogueOpen = () => {
    setErrorDialogueBoxOpen(true);
  };
  const handleDialogueClose = () => {
    setErrorList([]);
    setErrorDialogueBoxOpen(false);
  };

  useEffect(() => {
    getdepartementById();
  }, []);

  const getdepartementById = async () => {
    const response = await axios.get(
      `http://localhost:3001/departements/${id}`
    );
    //console.log(response);
    setname(response.data.name);
    setLastName(response.data.description);
  };

  const updateDepartement = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:3001/Udepartements/${id}`, {
        name,
        description,
      });
      navigate("/departements");
    } catch (error) {
      console.log(error.response.data.errors);
      //Display error message
      setErrorList(error.response.data.errors);
      handleDialogueOpen();
    }
  };

  useEffect(() => {});

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <div className="page-wrapper">
        <div className="content">
          <div className="card-box">
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <h3 className="page-title">Modifier le patient</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <form
                  id="addPatientForm"
                  name="addPatientForm"
                  onSubmit={updateDepartement}
                >
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          Label <span className="text-danger">*</span>
                        </label>
                        <input
                          name="name"
                          className="form-control"
                          type="text"
                          required
                          value={name}
                          onChange={(event) => setname(event.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Description</label>
                        <input
                          name="description"
                          className="form-control"
                          type="text"
                          required
                          value={description}
                          onChange={(event) => setLastName(event.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="m-t-20 text-center">
                    <button
                      type="submit"
                      className="btn btn-primary submit-btn"
                    >
                      Update departement
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
          ErrorTitle="Error: Edit Patient"
          ErrorList={errorList}
        />
      </div>
    </Box>
  );
}

export default EditDepartement;
