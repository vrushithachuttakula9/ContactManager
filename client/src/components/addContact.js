//src/components/addContact.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddContact = ({ addContactHandler }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  // const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const add = (e) => {
    e.preventDefault();
    addContactHandler({ name, email });
    setName('');
    setEmail('');
    navigate('/');
  };

  return (
    <div className="max-w-xs mx-auto mt-10 p-5 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-medium mb-5 text-teal-600">Add Contact</h2>
      <form onSubmit={add} className="space-y-1">
      <div className='mb-4'>
          <label className="block mb-1 text-sm">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="text-sm w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-teal-400"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm">Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-teal-400"
          />
        </div>
        <div className='text-center'>
        <button
          type="submit"
          className="mt-5 px-2 py-1 text-base bg-teal-600 text-white rounded-md hover:bg-teal-700"
        >
          Add
        </button>
        </div>
      </form>
    </div>
  );
};

export default AddContact;
