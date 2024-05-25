import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/Login/Login";
import SignupPage from "./components/SignUp/SignupPage";
import Dashboard from "./components/dashboard/Dashboard fff";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import PatientDashboard from "./components/dashboard/PatientDashboard";
import DoctorDashboard from "./components/dashboard/DoctorDashboard";
import AddUser from "./components/User/AddUser3";
import UserList from "./components/User/UserList3";
import EditUser from "./components/User/EditUser3";
import User from "./components/User/User";
import AddPatient from "./components/Patient/AddPatient";
import PatientList from "./components/Patient/PatientList";
import EditPatient from "./components/Patient/EditPatient";
import Patient from "./components/Patient/Patient";
import AddDoctor from "./components/Doctor/AddDoctor";
import DoctorList from "./components/Doctor/DoctorList";
import EditDoctor from "./components/Doctor/EditDoctor";
import Doctor from "./components/Doctor/Doctor";
import AddMedicine from "./components/Medicine/AddMedicine";
import MedicineList from "./components/Medicine/MedicineList";
import EditMedicine from "./components/Medicine/EditMedicine";
import Medicine from "./components/Medicine/Medicine";
import PrescriptionList from "./components/Prescription/PrescriptionList";
import Prescription from "./components/Prescription/Prescription";
import Success from "./components/Prescription/Success";
import Cancel from "./components/Prescription/Cancel";
import PatientHistory from "./components/Patient/PatientHistory";
import AdminAppointment from "./components/Appointment/AdminAppointment";
import PatientAppointment from "./components/Appointment/PatientAppointment";
import DoctorAppointment from "./components/Appointment/DoctorAppointment";
import DoctorProfile from "./components/Profile/DoctorProfile";
import Microphone from "./components/Microphone/Microphone";
import PatientProfile from "./components/Profile/PatientProfile";
import AdminProfile from "./components/Profile/AdminProfile";
import { UserContext } from "./Context/UserContext";

import ReactDOM from "react-dom/client";

import AppMeeting from "./AppMeeting";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Departement from "./components/Departement/Departement.js";
import DepartementList from "./components/Departement/DepartementList";
import AddDepartement from "./components/Departement/AddDepartement";
import EditDepartement from "./components/Departement/EditDepartement";
import LandingPage from "./components/Home/LandingPage.jsx";
import Services from "./components/Home/Services.jsx";
import About from "./components/Home/About.jsx";
import Contact from "./components/Home/Contact.jsx";
import Home from "./components/Home/Home.jsx";

const NotFound = () => (
  <h2 style={{ margin: "70px" }}>This Path is not available</h2>
);

function ProtectedAdminRoute({ children }) {
  const { currentUser } = useContext(UserContext);
  return currentUser.userType === "Admin" ? children : <Navigate to="/login" />;
}

function ProtectedStaffRoute({ children }) {
  const { currentUser } = useContext(UserContext);
  return currentUser.userType === "Admin" ||
    currentUser.userType === "Doctor" ? (
    children
  ) : (
    <Navigate to="/login" />
  );
}

export default function PageRoutes() {
  const { currentUser } = useContext(UserContext);
  return (
    <Routes>
         <Route path="/" element={<LandingPage/>}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} /> {/* Child route for exact path "/" */}
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
       <Route path="/dash" element={<Dashboard />}>
        <Route
          index
          element={
            currentUser.userType === "Admin" ? (
              <AdminDashboard />
            ) : currentUser.userType === "Doctor" ? (
              <DoctorDashboard />
            ) : currentUser.userType === "Patient" ? (
              <PatientDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="users"
          element={
            <ProtectedAdminRoute>
              <User />
            </ProtectedAdminRoute>
          }
        >
          <Route index element={<UserList />} />
          <Route path="add" element={<AddUser />} />
          <Route path="edit/:id" element={<EditUser />} />
        </Route>

        <Route
          path="patients"
          element={
            <ProtectedAdminRoute>
              <Patient />
            </ProtectedAdminRoute>
          }
        >
          <Route index element={<PatientList />} />
          <Route path="add" element={<AddPatient />} />
          <Route path="edit/:id" element={<EditPatient />} />
        </Route>
        <Route
          path="doctors"
          element={
            <ProtectedAdminRoute>
              <Doctor />
            </ProtectedAdminRoute>
          }
        >
          <Route index element={<DoctorList />} />
          <Route path="add" element={<AddDoctor />} />
          <Route path="edit/:id" element={<EditDoctor />} />
        </Route>
        <Route path="medicines" element={<Medicine />}>
          <Route
            index
            element={
              <ProtectedStaffRoute>
                <MedicineList />
              </ProtectedStaffRoute>
            }
          />
          <Route
            path="add"
            element={
              <ProtectedAdminRoute>
                <AddMedicine />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="edit/:id"
            element={
              <ProtectedAdminRoute>
                <EditMedicine />
              </ProtectedAdminRoute>
            }
          />
        </Route>
        <Route path="prescriptions" element={<Prescription />}>
          <Route index element={<PrescriptionList />} />
          <Route path="success" element={<Success />} />
          <Route path="cancel" element={<Cancel />} />
        </Route>

       

        <Route
          path="departements"
          element={
            <ProtectedAdminRoute>
              <Departement />
            </ProtectedAdminRoute>
          }
        >
          <Route index element={<DepartementList />} />
          <Route path="add" element={<AddDepartement />} />
          <Route path="edit/:id" element={<EditDepartement />} />
        </Route>

        <Route
          path="patient/history/:id"
          element={
            <ProtectedStaffRoute>
              <PatientHistory />
            </ProtectedStaffRoute>
          }
        />
        <Route
          path="appointments"
          element={
            currentUser.userType === "Admin" ? (
              <AdminAppointment />
            ) : currentUser.userType === "Doctor" ? (
              <DoctorAppointment />
            ) : currentUser.userType === "Patient" ? (
              <PatientAppointment />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="microphone"
          element={
            currentUser.userType === "Admin" ? (
              <Microphone />
            ) : currentUser.userType === "Doctor" ? (
              <Microphone />
            ) : currentUser.userType === "Patient" ? (
              <Microphone />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="meeting"
          element={
            currentUser.userType === "Admin" ? (
              <>
                <ToastContainer
                  toastClassName={() =>
                    "relative flex py-4 px-3 rounded overflow-hidden cursor-pointer bg-white shadow-lg"
                  }
                  bodyClassName={() => "text-black text-base font-normal"}
                  position="bottom-left"
                  autoClose={4000}
                  hideProgressBar={true}
                  newestOnTop={false}
                  closeButton={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
                <AppMeeting />
              </>
            ) : currentUser.userType === "Doctor" ? (
              <>
                <ToastContainer
                  toastClassName={() =>
                    "relative flex py-4 px-3 rounded overflow-hidden cursor-pointer bg-white shadow-lg"
                  }
                  bodyClassName={() => "text-black text-base font-normal"}
                  position="bottom-left"
                  autoClose={4000}
                  hideProgressBar={true}
                  newestOnTop={false}
                  closeButton={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                />
                <AppMeeting />
              </>
            ) : currentUser.userType === "Patient" ? (
              <>
                <ToastContainer
                  toastClassName={() =>
                    "relative flex py-4 px-3 rounded overflow-hidden cursor-pointer bg-white shadow-lg"
                  }
                  bodyClassName={() => "text-black text-base font-normal"}
                  position="bottom-left"
                  autoClose={4000}
                  hideProgressBar={true}
                  newestOnTop={false}
                  closeButton={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
                <AppMeeting />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="profile"
          element={
            currentUser.userType === "Admin" ? (
              <AdminProfile />
            ) : currentUser.userType === "Doctor" ? (
              <DoctorProfile />
            ) : currentUser.userType === "Patient" ? (
              <PatientProfile />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}
