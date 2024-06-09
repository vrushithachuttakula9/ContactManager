//src/components/contactList.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ContactCard from './contactCard.js';

const ContactList = (props) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const deleteContactHandler = (id) => {
        props.getContactId(id);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        if (event.target.value !== "") {
            const filteredContacts = props.contacts.filter(contact =>
                contact.name.toLowerCase().includes(event.target.value.toLowerCase())
            );
            setSearchResults(filteredContacts);
        } else {
            setSearchResults(props.contacts);
        }
    };

    const renderContactList = (searchTerm.length < 1 ? props.contacts : searchResults).map((contact) => {
        return (
            <ContactCard 
                contact={contact} 
                clickHandler={deleteContactHandler}
                key={contact._id}
            /> 
        );
    });

    return (
        <div className="relative">
            <div className="fixed top-20 left-0 right-0 bg-white z-20 p-4 shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between m-2">
                    <div className="flex items-center justify-between w-full sm:w-auto mb-2 sm:mb-0">
                        <h2 className="text-xl sm:text-2xl font-medium text-teal-600">Contact List</h2>
                        <Link to="/add" className="ml-4 sm:hidden">
                            <button className="p-2 bg-teal-600 text-white rounded hover:bg-teal-700 text-sm">
                                Add Contact
                            </button>
                        </Link>
                    </div>
                    <div className="flex flex-grow justify-center mb-2 sm:mb-0">
                        <input 
                            type="text"
                            placeholder="Search Contacts"
                            value={searchTerm}
                            onChange={handleSearch}
                            className="p-2 border rounded border-gray-200 w-full sm:w-96 focus:outline-none focus:border-teal-600"
                        />
                    </div>
                    <Link to="/add" className="hidden sm:inline-block sm:ml-4">
                        <button className="p-2 bg-teal-600 text-white rounded hover:bg-teal-700 text-sm sm:text-base">
                            Add Contact
                        </button>
                    </Link>
                </div>
            </div>
            <div className="pt-32 sm:pt-24">{renderContactList.length > 0 ? renderContactList : "No contacts found"}</div>
        </div>
    );
};

export default ContactList;


