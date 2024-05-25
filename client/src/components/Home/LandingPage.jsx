// LandingPage.js
import React from 'react';
import Navbar from './Navbar';
import { Link, Outlet } from 'react-router-dom';
import Footer from './Footer';

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      
      <div>
        <h1>Welcome to Our Website</h1>
        <p>Learn more about our services, company, and contact us!</p>
        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>
      <Outlet/>
      <Footer />
    </div>
  );
};

export default LandingPage;
