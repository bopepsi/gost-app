// src/components/LogoutButton.js

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth-context';

const LogoutButton = () => {
    const navigate = useNavigate();
    const Auth = useContext(AuthContext)

    const handleLogout = () => {
        Auth.logout()
        // Redirect to login page
        navigate('/');
    };

    return (
        <button onClick={handleLogout} className="logout-button">
            Logout
        </button>
    );
};

export default LogoutButton;
