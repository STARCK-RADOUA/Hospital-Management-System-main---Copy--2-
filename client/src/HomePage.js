import { BrowserRouter as Router, Link } from 'react-router-dom'
import Navbar from './components/Navbar'
import PageRoutes from './PageRoutes'
import { UserContext } from './Context/UserContext'
import React, { useContext } from 'react';
import styles from './home.module.css';



export default function HomePage() {
    const { currentUser, signInUser } = useContext(UserContext);

    return (
        <Router>
            <div className={styles.container}>
            
                <PageRoutes />
            </div>
        </Router>
    )
}