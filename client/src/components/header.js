//src/components/header.js
import React from 'react';
import { useAuth } from '../context/authContext.js';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="h-20 fixed top-0 left-0 right-0 bg-teal-600 text-white p-4 shadow-md z-10 flex items-center justify-center">
            <h2 className="text-4xl font-medium">Contact App</h2>
            <button
                onClick={handleLogout}
                className="absolute right-4 text-white bg-transparent border border-white px-4 py-2 rounded hover:bg-white hover:text-teal-600 transition"
            >
                Logout
            </button>
        </div>
    );
};

export default Header;
