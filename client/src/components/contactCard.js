//src/components/contactCard.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrashAlt, FaEdit, FaEllipsisV } from 'react-icons/fa';

const ContactCard = (props) => {
    const { _id, name, email } = props.contact;
    const [dropdownOpen, setDropdownOpen] = useState(false);

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

    // Map the hash to a color
    const getColor = (id) => {
        const hash = hashCode(id);
        const index = Math.abs(hash) % colors.length;
        return colors[index];
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-4 flex items-center justify-between">
            <Link to={`/contact/${_id}`} state={{ contact: props.contact }} className="block mb-2 flex items-center flex-grow">
                <div className="flex items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white mr-4 ${getColor(_id)}`}>
                        <span className="text-lg font-semibold">{name.charAt(0)}</span>
                    </div>
                    <div>
                        <div className="text-lg font-semibold">{name}</div>
                        <div className="text-sm text-gray-500">{email}</div>
                    </div>
                </div>
            </Link>
            <div className="flex items-center">
                {/* Icons for larger screens */}
                <div className="hidden sm:flex items-center">
                    <button onClick={() => props.clickHandler(_id)} className="px-2 py-2 bg-red-500 text-white rounded hover:bg-red-600 mr-2">
                        <FaTrashAlt />
                    </button>
                    <Link to={`/edit`} state={{ contact: props.contact }}>
                        <button className="px-2 py-2 bg-teal-600 text-white rounded hover:bg-teal-700">
                            <FaEdit />
                        </button>
                    </Link>
                </div>
                {/* Menu icon for small screens */}
                <div className="sm:hidden relative">
                    <button onClick={toggleDropdown} className="p-2">
                        <FaEllipsisV />
                    </button>
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
                            <button onClick={() => { props.clickHandler(_id); toggleDropdown(); }} className="block px-4 py-2 text-red-500 hover:bg-gray-100 w-full text-left">
                                Delete
                            </button>
                            <Link to={`/edit`} state={{ contact: props.contact }} className="block px-4 py-2 text-teal-600 hover:bg-gray-100 w-full text-left" onClick={toggleDropdown}>
                                Edit
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContactCard;
