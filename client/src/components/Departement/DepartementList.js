import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ErrorDialogueBox from "../MUIDialogueBox/ErrorDialogueBox";
import Box from "@mui/material/Box";
import PatientTable from "../MUITable/PatientTable";
import styles from "./Prescription.module.css";
import DepartementTable from "../MUITable/DepartementTable";

function DepartementList() {
  const params = new URLSearchParams(window.location.search);
  const name = params.get("name");

  const [departements, setdepartements] = useState([]);
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
    getDepartement();
  }, []);

  const getDepartement = async () => {
    try {
      const response = await axios.get("http://localhost:3001/departements", {
        params: {
          name: name,
        },
      });
      setdepartements(response.data);
    } catch (error) {
      setErrorList([error]);
      handleDialogueOpen();
    }
  };

  const deleteDepartement = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/Ddepartements/${id}`);
      getDepartement();
    } catch (error) {
      setErrorList([error]);
      handleDialogueOpen();
    }
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <div className="page-wrapper">
        <div className="content">
          <div>
            <h3 className={styles.pageTitle}>Departement</h3>
          </div>
          <form action="/departements" name="userFilter">
            <div className={styles.table}>
              <div className="col-sm-4 col-md-4">
                <div className="form-floating">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Patient Name"
                  />
                  <label className="focus-label">Departement Name</label>
                </div>
              </div>
              
              <div className="col-sm-4 col-md-4">
                <Link
                  to="/dash/departements/add"
                  className="btn btn-primary float-right btn-rounded"
                >
                  <i className="fa fa-plus"></i> Add Departement
                </Link>
              </div>
            </div>
          </form>
          <DepartementTable
            departementList={departements}
            deleteDepartement={deleteDepartement}
          />
        </div>
        <ErrorDialogueBox
          open={errorDialogueBoxOpen}
          handleToClose={handleDialogueClose}
          ErrorTitle="Error: Delete departement"
          ErrorList={errorList}
        />
      </div>
    </Box>
  );
}

export default DepartementList;
