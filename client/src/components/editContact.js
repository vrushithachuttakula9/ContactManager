//src/components/editContact.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const EditContact = ({ updateContactHandler }) => {
  const location = useLocation();
  const contactToEdit = location.state?.contact || {};

  const [name, setName] = useState(contactToEdit.name || "");
  const [email, setEmail] = useState(contactToEdit.email || "");
  const navigate = useNavigate();

  const update = (e) => {
    e.preventDefault();
    if (name === "" || email === "") {
      alert("All the fields are mandatory!");
      return;
    }
    updateContactHandler({ id: contactToEdit._id, name, email });

    setName(""); 
    setEmail("");
    navigate('/');
  };

  useEffect(() => {
    if (contactToEdit) {
      setName(contactToEdit.name);
      setEmail(contactToEdit.email);
    }
  }, [contactToEdit]);

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-medium mb-4 text-teal-600">Edit Contact</h2>
      <form onSubmit={update} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-teal-400"
          />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-teal-400"
          />
        </div>
        <div className='text-center'>
        <button
          type="submit"
          className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
        >
          Update
        </button>
        </div>
      </form>
    </div>
  );
};

export default EditContact;