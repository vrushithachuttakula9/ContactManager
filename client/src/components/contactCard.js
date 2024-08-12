//src/components/contacdCard.js
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaTrashAlt, FaEdit, FaEllipsisV } from 'react-icons/fa';

const ContactCard = (props) => {
    const { _id, name, email, image } = props.contact;
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const menu = useRef(null);

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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menu.current && !menu.current.contains(event.target)) {
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

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-5 flex items-center justify-between max-w-full min-w-[16rem]">
            <Link to={`/contact/${_id}`} state={{ contact: props.contact }} className="block mb-1 flex items-center flex-grow">
                <div className="flex items-center">
                {image ? (
                        <img src={`${process.env.REACT_APP_API_BASE_URL}/uploads/${image}`} alt={name} className="sm:w-10 sm:h-10 w-8 h-8 rounded-full object-cover mr-3" />
                    ) : (
                    <div className={`sm:w-10 sm:h-10 w-8 h-8 rounded-full flex items-center justify-center text-white mr-3 ${getColor(_id)}`}>
                        <span className="text-sm sm:text-lg font-semibold">{name.charAt(0)}</span>
                    </div>
                    )
                }
                    <div>
                        <div className="sm:text-base text-xxs font-semibold">{name}</div>
                        <div className="sm:text-sm text-xxs text-gray-500">{email}</div>
                    </div>
                </div>
            </Link>
            <div className="flex items-center">
                {/* Icons for larger screens */}
                <div className="hidden sm:flex items-center">
                    <button onClick={() => props.clickHandler(_id)} className="px-1 py-1 bg-red-500 text-white rounded hover:bg-red-600 mr-2">
                        <FaTrashAlt />
                    </button>
                    <Link to={`/edit`} state={{ contact: props.contact }}>
                        <button className="px-1 py-1 bg-teal-600 text-white rounded hover:bg-teal-700">
                            <FaEdit />
                        </button>
                    </Link>
                </div>
                {/* Menu icon for small screens */}
                <div ref={menu} className="sm:hidden relative">
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
