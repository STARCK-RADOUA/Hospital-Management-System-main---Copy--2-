import React, { useContext } from "react";
import { UserContext } from '../../Context/UserContext'

function AppointmentForm(props) {
    const { currentUser } = useContext(UserContext);
    console.log(currentUser);
console.log(props.patientList);


    return (
        <form name={props.formName} onSubmit={props.formOnSubmit}>
            <div className="form-row">
                <div className="form-group col-11 mx-auto">
                    <label htmlFor="appDate">Appointment Date :</label>
                    <input type="text" name="appDate" className="form-control" disabled defaultValue={props.appDate} required></input>
                </div>

                <div className="form-group col-11 pl-3 mx-auto">
                    <label htmlFor="appTime">Appointment Time :</label>
                    <select name="appTime" id="appTime" className="form-control" aria-label="Default select example" required>
                        <option selected value={props.appTime}>{props.appTime}</option>
                        {
                            props.availableSlots.map(slot => {
                                if (props.appTime !== slot) // Utilisation de !== au lieu de !=
                                    return <option key={slot} value={slot}>{slot}</option>; // Ajout de key={slot}
                            })
                        }
                    </select>
                </div>

                <div className="form-group col-11 pl-3 mx-auto">
                    <label htmlFor="doctor">Doctor :</label>
                    <select name="doctor" id="doctor" className="form-control" aria-label="Default select example" required disabled={props.doctorSelected ? true : null}> {/* Correction de la logique */}
                        <option value=''>Choose Doctor</option>
                        {
                            props.doctorList.map(doctor => {
                                if (props.doctorSelected === doctor._id) { // Utilisation de === au lieu de ==
                                    return <option key={doctor._id} value={doctor._id} selected>{doctor.userId.firstName} {doctor.userId.lastName}</option>; // Ajout de key={doctor._id}
                                }
                                else {
                                    return <option key={doctor._id} value={doctor._id}>{doctor.userId.firstName} {doctor.userId.lastName}</option>; // Ajout de key={doctor._id}
                                }
                            })
                        }
                    </select>
                </div>

                <div className="form-group col-11 pl-3 mx-auto">
                    <label htmlFor="appointmentType" >Appointment Type:</label>
                    <select
                        id="appointmentType"
                        className="form-control" // Ajout de la classe col-sm-7 pour correspondre au style des autres champs
                        value={props.appointmentType} 
                        required disabled={props.appointmentType ? true : null}// Utilisation de la prop appointmentType
                        // Appel de la fonction setAppointmentType lorsqu'une option est sélectionnée
                    >
                        <option value={props.appointmentType}>{props.appointmentType}</option>
                       
                    </select>
                </div>

                <div className="form-group col-11 pl-3 mx-auto">
                    <label htmlFor="patient">Patient :</label>
                    <select name="patient" className="form-control" disabled={currentUser.userType === "Patient" }>
                    {props.patientList.map((patient, i) => (
    <option key={i} value={patient._id} selected={currentUser.userId === patient.userId._id}>
        {patient.userId.firstName} {patient.userId.lastName}
    </option>
    
))}

                    </select>
                </div>
            </div>
            <input type="hidden" name="id" defaultValue={props.appointmentId} />
            <div className="text-center">
                <input type="submit" className="btn btn-primary my-2 mx-4 col-4" id="customBtn" value="Submit"></input>
            </div>
        </form>
    );
}

export default AppointmentForm;
