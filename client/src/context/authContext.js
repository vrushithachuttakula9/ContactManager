// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/contact.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
        localStorage.setItem('user', JSON.stringify(user));
    } else {
        localStorage.removeItem('user');
    }
  }, [user]); 

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get('/user/profile', {
          headers: {
            'x-auth-token': token,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    if (token && !user) {
      fetchUserProfile();
    }
  }, [token, user]);

  const register = async (username, password) => {
    try {
      const response = await api.post('/user/register', { username, password });
      setToken(response.data.token);
      setUser({ username });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify({ username }));
      navigate('/');
    } catch (error) {
      console.error('Register Error:', error);
      throw error;
    }
  };

  const login = async (username, password) => {
    try {
      const response = await api.post('/user/login', { username, password });
      setToken(response.data.token);
      setUser({ username });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify({ username }));
      navigate('/');
    } catch (error) {
      console.error('Login Error:', error);
      throw error;
    }
  };

  const logout = () => {
    setToken('');
    setUser(null)
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const value = {
    token,
    user,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
