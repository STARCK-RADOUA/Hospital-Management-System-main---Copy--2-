import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import PageRoutes from './PageRoutes'
import { UserContext } from './Context/UserContext'
import React, { useContext } from 'react';



export default function HomePage() {
    const { currentUser, signInUser } = useContext(UserContext);

    return (
        <div>
            <Router>
            <div >
            
                <PageRoutes />
            </div>

           
            
        </Router>

       


        </div>
        
    )
}