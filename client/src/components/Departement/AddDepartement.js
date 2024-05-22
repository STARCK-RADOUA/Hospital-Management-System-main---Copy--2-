import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ErrorDialogueBox from "../MUIDialogueBox/ErrorDialogueBox";
import Box from "@mui/material/Box";

function AddDepartement() {
  const navigate = useNavigate();

  const [name, setname] = useState("");
  const [description, setDescripton] = useState("");

  const [errorDialogueBoxOpen, setErrorDialogueBoxOpen] = useState(false);
  const [errorList, setErrorList] = useState([]);
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
          navigate("/departements");
        } else {
          //Display error message
          setErrorList(data.errors);
          handleDialogueOpen();
        }
      });
  };

  useEffect(() => {});

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
