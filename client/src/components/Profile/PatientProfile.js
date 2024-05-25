import React, { useEffect, useState, useContext } from 'react';
import { NavLink } from 'react-router-dom'
import { useNavigate, useParams } from "react-router-dom";
import ErrorDialogueBox from '../MUIDialogueBox/ErrorDialogueBox';
import axios from "axios";
import Box from '@mui/material/Box';
import { UserContext } from '../../Context/UserContext'

function PatientProfile() {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDOB] = useState('');
  const [userId, setUserId] = useState('');
  const [passwordMatchDisplay, setPasswordMatchDisplay] = useState('none');
  const [patientId, setPatientId] = useState('');
  const [passwordValidationMessage, setPasswordValidationMessage] = useState('');
  const { id } = useParams();

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
    getPatientById();
  }, []);

  const getPatientById = async () => {
    let patientUserId = currentUser.userId;
    const response = await axios.get(`http://localhost:3001/profile/patient/${patientUserId}`);
    //console.log(response);
    setPatientId(response.data._id);
    setFirstName(response.data.userId.firstName);
    setLastName(response.data.userId.lastName);
    setEmail(response.data.userId.email);
    setUsername(response.data.userId.username);
 
    
    setPhone(response.data.phone);
    setAddress(response.data.address);
    setUserId(response.data.userId._id);
    setGender(response.data.gender);
    setDOB(response.data.dob);
  };

  const updatePatient = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:3001/patients/${patientId}`, {
        firstName,
        lastName,
        username,
        email,
        phone,
        password,
        confirmPassword,
        address,
        gender,
        dob,
        userId
      });
      navigate("/dash/profile");
    } catch (error) {
      console.log(error.response.data.errors);
      //Display error message
      setErrorList(error.response.data.errors);
      handleDialogueOpen();
    }
  };


  useEffect(() => {
    if ((typeof password !== 'undefined') && password.length > 0 && password?.trim()?.length <= 6) {
      setPasswordValidationMessage('Password Length must be greater than 6 characters');
    }
    else {
      setPasswordValidationMessage('');
    }
    if (password === confirmPassword) {
      setPasswordMatchDisplay('none');
    }
    else {
      setPasswordMatchDisplay('block');
    }
  }, [password, confirmPassword])

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <div className="page-wrapper">
        <div className="content">
          <div className="card-box">
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <h3 className="page-title">Modifier le  Profile</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <form id="addPatientForm" name='addPatientForm' onSubmit={updatePatient}>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Prénom <span className="text-danger">*</span></label>
                        <input name="firstName" className="form-control" type="text" required value={firstName} onChange={(event) => setFirstName(event.target.value)} />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Nom</label>
                        <input name="lastName" className="form-control" type="text" required value={lastName} onChange={(event) => setLastName(event.target.value)} />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Nom d'utilisateur <span className="text-danger">*</span></label>
                        <input name="username" className="form-control" type="text" required value={username} onChange={(event) => setUsername(event.target.value)} />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Email <span className="text-danger">*</span></label>
                        <input name="email" className="form-control" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Mot de passe</label>
                        <input name="password" className="form-control" type="password" required value={password}  onChange={(event) => {password.length > 25 ? console.log('google password') : setPassword(event.target.value)}} />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Confirmer le mot de passe</label>
                        <input name="confirmPassword" className="form-control" type="password" required value={password} onChange={(event) =>{password.length > 25 ? console.log('google password') : setConfirmPassword(event.target.value)}} />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Téléphone </label>
                        <input name="phone" className="form-control" type="text" value={phone} onChange={(event) => setPhone(event.target.value)} />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Adresse </label>
                        <input name="address" className="form-control" type="text" value={address} onChange={(event) => setAddress(event.target.value)} />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Genre</label>
                        <select name="gender" className="form-select" value={gender} onChange={(event) => setGender(event.target.value)}>
                          <option value="Male">Homme</option>
                          <option value="Female">Femme</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Date de naissance </label>
                        <input name="dob" className="form-control" type="date" value={dob} onChange={(event) => setDOB(event.target.value)} />
                      </div>
                    </div>
                  </div>
                  <div className="m-t-20 text-center">
                    <button type="submit" className="btn btn-primary submit-btn">Mettre à jour le Profile</button>
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
  )
}

export default PatientProfile;
