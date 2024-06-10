// //src/components/header.js
// import React from 'react';
// import { useAuth } from '../context/authContext.js';
// import { useNavigate } from 'react-router-dom';

// const Header = () => {
//     const { logout } = useAuth();
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         logout();
//         navigate('/login');
//     };

//     return (
//         <div className="h-20 fixed top-0 left-0 right-0 bg-teal-600 text-white p-4 shadow-md z-10 flex items-center justify-center">
//             <h2 className="text-4xl font-medium">Contact App</h2>
//             <button
//                 onClick={handleLogout}
//                 className="absolute right-4 text-white bg-transparent border border-white px-4 py-2 rounded hover:bg-white hover:text-teal-600 transition"
//             >
//                 Logout
//             </button>
//         </div>
//     );
// };

// export default Header;

// src/components/Header.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext.js';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import api from '../api/contact.js';

const Header = () => {
    const { logout, token } = useAuth();
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [username, setUsername] = useState('');

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

    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    return (
        <div className="h-20 fixed top-0 left-0 right-0 bg-teal-600 text-white p-4 shadow-md z-30 flex items-center justify-between">
            <div className="flex-1 flex items-center justify-center">
                <h2 className="text-4xl font-medium">Contact App</h2>
            </div>
            <div className="relative">
                <FaUserCircle
                    size={32}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="cursor-pointer"
                />
                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-30" >
                        <div className="px-4 py-2 text-center text-gray-800 border-b">
                            <strong>{username}</strong>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="block text-center w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
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

