// LandingPage.js
import React from 'react';
import Navbar from './Navbar';
import { Link, Outlet } from 'react-router-dom';
import Footer from './Footer';
import './style.css'
const LandingPage = () => {
  return (
    <div id="container">
      <Navbar />
      <Outlet/>
     <Footer/>  
    </div>
  );
};

export default LandingPage;
