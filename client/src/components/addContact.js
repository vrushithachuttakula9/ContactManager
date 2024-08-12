//src/components/addContact.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddContact = ({ addContactHandler }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const add = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage('Please enter a valid email address.');
      return;
    }
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('image', image);

    try{
      await addContactHandler(formData);
      setName('');
      setEmail('');
      setImage(null);
      navigate('/');
    } catch(err){
      console.error('Error adding contact:', err);
      alert('There was an error adding the contact. Please try again.');
    }
    
  };

  return (
    <div className="max-w-xs mx-auto mt-5 p-5 bg-white rounded-lg shadow-md">
      <h2 className="text-center text-xl font-medium mb-5 text-teal-600">Add Contact</h2>
      <form onSubmit={add} className="space-y-1" encType="multipart/form-data">
        <div>
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
          {message && <p className="mt-2 text-xs text-red-600">{message}</p>}
        </div>
        <div>
          <label className="block mb-1 text-sm">Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="text-xs w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-teal-400"
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
