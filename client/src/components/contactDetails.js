//src/components/contactDetail.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ContactDetail = () => {
    const location = useLocation();
    const { contact } = location.state;

    return (
        <div className="mt-16 flex flex-col items-center justify-center h-full px-4 py-6 sm:px-6 lg:px-8">
            <div className="bg-white shadow-md rounded-lg p-8 mb-4 w-full sm:w-3/4 md:w-1/2 lg:w-1/3 flex flex-col items-center"> 
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-300 flex items-center justify-center mb-4">
                    <span className="text-2xl sm:text-4xl font-semibold">{contact.name.charAt(0)}</span>
                </div>
                <div className="text-center">
                    <div className="text-base sm:text-lg font-semibold mb-2">Name: {contact.name}</div>
                    <div className="text-sm sm:text-base text-gray-500">Email: {contact.email}</div>
                </div>
            </div>
            <div>
                <Link to='/'>
                    <button className="px-3 py-2 sm:px-4 sm:py-2 bg-teal-600 text-white rounded hover:bg-teal-700">
                        Back
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ContactDetail;
