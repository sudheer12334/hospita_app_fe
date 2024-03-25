import React from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook
import './navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOut } from '@fortawesome/free-solid-svg-icons';


const NavBar = () => {
    const { isAuthenticated, logout } = useAuth(); // Use the useAuth hook
    const nav=useNavigate();
    const handleLogout = () => {
        logout(); // Call the logout function from AuthContext
        nav('/');
        // Perform any additional logout logic (e.g., redirecting to login page)
    };

    return (
        <nav className="nav">
            <div className="nav-left">
                <ul className="nav-items">
                {!isAuthenticated && (
                    <li className="nav-item">
                        <NavLink className='nav-link' to='/'>Home</NavLink>
                    </li>
                )}    
                    {isAuthenticated && (
                        <>
                            <li className="nav-item">
                                <NavLink className='nav-link' to='/form'>Patient Form</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className='nav-link' to='/patients'>Get All Patients</NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </div>
            {isAuthenticated && (
                <div className="nav-right">
                    <button className="logout-button" onClick={handleLogout}>Logout <FontAwesomeIcon icon={faSignOut} /></button>
                    
                </div>
            )}
        </nav>
    );
}

export default NavBar;
