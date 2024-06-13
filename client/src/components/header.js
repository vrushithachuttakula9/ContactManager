// src/components/Header.js
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/authContext.js';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import api from '../api/contact.js';

const Header = () => {
    const { logout, token } = useAuth();
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [username, setUsername] = useState('');
    const profileMenu = useRef(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await api.get('/user/profile', {
                    headers: {
                        'x-auth-token': token
                    }
                });
                setUsername(response.data.username);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        if (token) {
            fetchUserProfile();
        }
    }, [token]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileMenu.current && !profileMenu.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        if (dropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownOpen]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    return (
        <div className="h-14 fixed top-0 left-0 right-0 bg-teal-600 text-white p-4 shadow-md z-30 flex items-center justify-between">
            <div className="flex-1 flex items-center justify-center">
                <h2 className="text-3xl font-medium">Contact App</h2>
            </div>
            <div ref={profileMenu} className="relative">
                <FaUserCircle
                    size={28}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="cursor-pointer"
                />
                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-30" >
                        <div className="text-sm px-2 py-1 text-center text-gray-800 border-b">
                            <strong>{username}</strong>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="text-sm block text-center w-full text-left px-2 py-1 text-gray-800 hover:bg-gray-200"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;

