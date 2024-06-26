//src/App.js
import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import api from "./api/contact.js";
import Login from './components/login.js';
import Register from './components/register.js';
import Header from './components/header.js';
import AddContact from './components/addContact.js';
import EditContact from './components/editContact.js';
import ContactList from './components/contactList.js';
import ContactDetail from './components/contactDetails.js';
import { useAuth } from './context/authContext.js';
import PrivateRoute from './components/privateRoutes.js';
import PublicRoute from './components/publicRoutes.js';
  
function App() {
    const [contacts, setContacts] = useState([]);
  
    const { token } = useAuth();
  
    const retrieveContacts = async () => {
      try {
        // const response = await api.get('/contacts/', {
        //   headers: { 'x-auth-token': {token} }
        // });
        const response = await api.get('/contacts/');
        return response.data;
      } catch (error) {
        console.error("Failed to retrieve contacts:", error);
        return [];
      }
    };

    const addContactHandler = async (formData) => {
      try {
        const response = await api.post("/contacts/add", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'x-auth-token': token,
          }
        });
        setContacts([...contacts, response.data]);
      } catch (error) {
        console.error("There was an error adding the contact!", error);
      }
    };

    const updateContactHandler = async (formData, contactId) => {
      try {
        const response = await api.put(`/contacts/${contactId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'x-auth-token': token,
          }
        });
        const updatedContact = response.data;
        setContacts(
          contacts.map(contact => {
            return contact._id === updatedContact._id ? updatedContact : contact;
          })
        );
      } catch (error) {
        console.error("There was an error updating the contact!", error);
      }
    };
    
    const removeContactHandler = async (id) => {
      const userConfirm = window.confirm("Are you sure, you want to delete this item");
      if (userConfirm) {
        try {
          await api.delete(`/contacts/${id}`, {
            headers: { 'x-auth-token': {token} }
          });
          // await api.delete(`/contacts/${id}`);
          const newContactList = contacts.filter(contact => contact._id !== id);
          setContacts(newContactList);
        } catch (error) {
          console.error(error);
        }
      }
    };
  
    useEffect(() => {
      const getAllContacts = async () => {
        const allContacts = await retrieveContacts();
        if (allContacts) setContacts(allContacts);
      };
      if (token) {
        getAllContacts();
      }
    }, [token]);
  
    return (
      <div className="mx-8 pt-24">
        {token && <Header />}
        <Routes>
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/add" element={<PrivateRoute><AddContact addContactHandler={addContactHandler} /></PrivateRoute>} />
          <Route path="/edit" element={<PrivateRoute><EditContact updateContactHandler={updateContactHandler} /></PrivateRoute>} />
          <Route path="/" element={<PrivateRoute><ContactList contacts={contacts} getContactId={removeContactHandler} /></PrivateRoute>} />
          <Route path="/contact/:id" element={<PrivateRoute><ContactDetail /></PrivateRoute>} />
        </Routes>
      </div>
    );
};
  
export default App;
  