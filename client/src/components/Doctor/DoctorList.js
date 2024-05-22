import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import ErrorDialogueBox from '../MUIDialogueBox/ErrorDialogueBox';
import Box from '@mui/material/Box';
import DoctorTable from '../MUITable/DoctorTable';
import styles from './Prescription.module.css';

function DoctorList() {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');

    const [doctors, setdoctor] = useState([]);

    const [errorDialogueBoxOpen, setErrorDialogueBoxOpen] = useState(false);
    const [errorList, setErrorList] = useState([]);
    const handleDialogueOpen = () => {
        setErrorDialogueBoxOpen(true)
    };
    const handleDialogueClose = () => {
        setErrorList([]);
        setErrorDialogueBoxOpen(false)
    };


    useEffect(() => {
        getdoctors();
    }, []
    );

    const getdoctors = async () => {
        const response = await axios.get("http://localhost:3001/doctors", {
            params: {
                name: name
            }
        });
        setdoctor(response.data);
        console.log("doctors", response.data);
    };

    const deleteDoctor = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/doctors/${id}`);
            getdoctors();
        } catch (error) {
            setErrorList(error);
            handleDialogueOpen();
        }
    };
    const toggleActivatedStatus = async (id, currentActivatedStatus) => {
        try {
            // Inverser le statut actuel
            const newActivatedStatus = !currentActivatedStatus;
            console.log("newActivatedStatus", newActivatedStatus);
            await axios.patch(`http://localhost:3001/doctors/${id}/activated`, { activated: newActivatedStatus });
            getdoctors();
        } catch (error) {
            setErrorList(error);
            handleDialogueOpen();
        }
    };


    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

            <div className="page-wrapper">
                <div className="content">
                   
                            <h4 className={styles.pageTitle}>Doctor</h4>
                   
                        
                 
                    <form action="/doctors" name="userFilter" >
                        <div className={styles.table}>

                            <div className="col-sm-4 col-md-4">
                                <div className="form-floating ">

                                    <input type="text" name="name" className="form-control" placeholder='Doctor Name' />
                                    <label className="focus-label">Doctor Name</label>
                                </div>
                            </div>

                            <div className="col-sm-4 col-md-4">
                                <button type="submit" className="btn btn-primary btn-block"> Search </button>
                            </div>
                            <div className="col-sm-4 col-md-4">
                            <Link to="/doctors/add" className="btn btn-primary float-right btn-rounded">
                                <i className="fa fa-plus"></i> Add Doctor
                            </Link>
                        </div>
                        </div>
                    </form>
                    <DoctorTable doctorList={doctors} deleteDoctor={deleteDoctor} toggleActivatedStatus={toggleActivatedStatus}/>
                    
                </div>
                <ErrorDialogueBox
                    open={errorDialogueBoxOpen}
                    handleToClose={handleDialogueClose}
                    ErrorTitle="Error: Add doctor"
                    ErrorList={errorList}
                />
            </div>

        </Box>
    )
}

export default DoctorList;
