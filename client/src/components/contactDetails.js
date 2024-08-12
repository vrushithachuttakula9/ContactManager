//src/components/contactDetail.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ContactDetail = () => {
    const location = useLocation();
    const { contact } = location.state;

    const colors = [
        'bg-red-500', 'bg-blue-500', 'bg-green-500', 
        'bg-yellow-500', 'bg-purple-500', 'bg-pink-500',
        'bg-orange-500', 'bg-indigo-500', 'bg-gray-500'
    ];

    const hashCode = (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    };

    const getColor = (id) => {
        const hash = hashCode(id);
        const index = Math.abs(hash) % colors.length;
        return colors[index];
    };

    return (
        <div className="mt-8 flex flex-col items-center justify-center h-full px-4 py-6 sm:px-6 lg:px-8">
            <div className="bg-white shadow-md rounded-lg p-8 mb-4 w-full max-w-xs min-w-[16rem] flex flex-col items-center">
                <div className={`w-10 h-10 sm:w-16 sm:h-16 rounded-full text-white ${getColor(contact._id)} flex items-center justify-center mb-4`}>
                    {contact.image ? (
                        <img
                            src={`${process.env.REACT_APP_API_BASE_URL}/uploads/${contact.image}`}
                            alt={contact.name}
                            className="w-full h-full rounded-full object-cover"
                            style={{ maxWidth: '100%', maxHeight: '100%' }}
                        />
                    ) : (
                        <span className="text-xl sm:text-2xl font-semibold">{contact.name.charAt(0)}</span>
                    )}
                </div>
                <div className="text-center">
                    <div className="text-sm sm:text-base font-semibold mb-2">Name: {contact.name}</div>
                    <div className="text-xs sm:text-sm text-gray-500">Email: {contact.email}</div>
                </div>
            </div>
            <div>
                <Link to='/'>
                    <button className="px-2 py-1 sm:px-2 sm:py-1 text-base bg-teal-600 text-white rounded hover:bg-teal-700">
                        Back
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ContactDetail;



