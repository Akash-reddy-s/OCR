import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [extractedText, setExtractedText] = useState('');

  // In a real app, this would involve an API call
  const login = (email, password) => {
    // Dummy validation for demonstration
    if (email && password) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setExtractedText(''); // Clear data on logout
  };

  const value = {
    isAuthenticated,
    extractedText,
    login,
    logout,
    setExtractedText,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to easily use the context
export const useAuth = () => {
  return useContext(AuthContext);
};