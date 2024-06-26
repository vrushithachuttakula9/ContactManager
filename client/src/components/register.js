//src/components/Register.js
import React, { useState } from 'react';
import { useAuth } from '../context/authContext.js';
import { Link } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { register } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password.length < 4) {
            setMessage('Password should be at least 4 characters long');
            return;
          }
        try {
            await register(username, password);
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setMessage('User already exists');
              } else {
                setMessage('Register failed');
              }
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className="p-6 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-lg text-teal-600 font-bold mb-3 text-center">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            required
                            className="text-sm mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                            className="text-sm mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                        />
                        {message && <p className="mt-4 text-sm text-red-600">{message}</p>}
                    </div>
                    <div className='text-center'>
                        <button
                            type="submit"
                            className="text-sm w-1/8 bg-teal-600 text-white py-1 px-2 rounded-md hover:bg-teal-700 focus:outline-none"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
                <p className="mt-4 text-xs text-center text-gray-600">
                    Already have an account? <Link to="/login" className="text-teal-600 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;