import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import ErrorDialogueBox from '../MUIDialogueBox/ErrorDialogueBox';
import Box from '@mui/material/Box';
import PatientTable from '../MUITable/PatientTable';
import styles from './Prescription.module.css';

function PatientList() {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');

    const [patients, setPatients] = useState([]);
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
        getPatients();
    }, []);

    const getPatients = async () => {
        try {
            const response = await axios.get("http://localhost:3001/patients", {
                params: {
                    name: name
                }
            });
            setPatients(response.data);
        } catch (error) {
            setErrorList([error]);
            handleDialogueOpen();
        }
    };

    const deletePatient = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/patients/${id}`);
            getPatients();
        } catch (error) {
            setErrorList([error]);
            handleDialogueOpen();
        }
    };

    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <div className="page-wrapper">
                <div className="content">
                    <div >
                   
                            <h3  className={styles.pageTitle}>Patient</h3>
                  
                      
                    </div>
                    <form action="/patients" name="userFilter" >
                        <div className={styles.table}>
                            <div className="col-sm-4 col-md-4">
                                <div className="form-floating">
                                    <input type="text" name="name" className="form-control" placeholder='Patient Name' />
                                    <label className="focus-label">Patient Name</label>
                                </div>
                            </div>
                            <div className="col-sm-4 col-md-4">
                                <button type="submit" className="btn btn-primary btn-block"> Search </button>
                            </div>
                            <div className="col-sm-4 col-md-4">
                            <Link to="/dash/patients/add" className="btn btn-primary float-right btn-rounded">
                                <i className="fa fa-plus"></i> Add Patient
                            </Link>
                        </div>
                        </div>
                    </form>
                    <PatientTable patientList={patients} deletePatient={deletePatient} />
                </div>
                <ErrorDialogueBox
                    open={errorDialogueBoxOpen}
                    handleToClose={handleDialogueClose}
                    ErrorTitle="Error: Delete Patient"
                    ErrorList={errorList}
                />
            </div>
        </Box>
    );
}

export default PatientList;
