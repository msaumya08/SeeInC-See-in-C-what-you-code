import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
      loadUser();
    }
    setLoading(false);
  }, []);

  const loadUser = async () => {
    try {
      const res = await axios.get('/api/auth/user');
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (err) {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['x-auth-token'];
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const register = async (formData) => {
    try {
      const res = await axios.post('/api/auth/register', formData);
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['x-auth-token'] = res.data.token;
      await loadUser();
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.msg || 'Registration failed'
      };
    }
  };

  const login = async (formData) => {
    try {
      const res = await axios.post('/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['x-auth-token'] = res.data.token;
      await loadUser();
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.msg || 'Login failed'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['x-auth-token'];
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        register,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 