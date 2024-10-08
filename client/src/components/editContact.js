//src/components/editContact.js
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const EditContact = ({ updateContactHandler }) => {
  const location = useLocation();
  const contactToEdit = useMemo(() => location.state?.contact || {},[location.state]);

  const [name, setName] = useState(contactToEdit.name || "");
  const [email, setEmail] = useState(contactToEdit.email || "");
  const [newImage, setNewImage] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (contactToEdit) {
      setName(contactToEdit.name);
      setEmail(contactToEdit.email);
    }
  }, [contactToEdit]);

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage('Please enter a valid email address.');
      return;
    }
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    if (newImage) {
      formData.append('image', newImage);
    }

    try{
      await updateContactHandler(formData, contactToEdit._id);

      setName("");
      setEmail("");
      navigate('/');
    } catch(err){
      console.error('Error in updating the contact:', err);
      alert('There was an error updating the contact. Please try again.');
    }
    
  };

  return (
    <div className="max-w-xs mx-auto mt-4 p-5 bg-white rounded-lg shadow-md">
      <h2 className="text-center text-xl font-medium mb-5 text-teal-600">Edit Contact</h2>
      <form onSubmit={handleUpdate} className="space-y-1" encType="multipart/form-data">
        <div>
          <label className="text-gray-500 block mb-1 text-sm">Name</label>
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
          <label className="text-gray-500 block mb-1 text-sm">Email</label>
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
        <div className='mb-2'>
          <label className="text-gray-500 block mb-1 text-sm">Upload New Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:border-teal-400"
          />
        </div>
        <div className='text-center'>
          <button
            type="submit"
            className="mt-5 px-1 py-1 text-base bg-teal-600 text-white rounded-md hover:bg-teal-700"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditContact;
