import React, { createContext, useContext, useState, useEffect } from 'react';

// Create auth context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      // In a real app, you would verify the token with your backend
      setCurrentUser({
        id: '1',
        name: 'ILCT TEAM',
        email: 'team@ilct.com',
        role: 'admin'
      });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // In a real app, you would make an API call here
      const mockUser = {
        id: '1',
        name: 'ILCT TEAM',
        email: 'team@ilct.com',
        role: 'admin'
      };
      setCurrentUser(mockUser);
      localStorage.setItem('token', 'mock-token');
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('token');
  };

  const value = {
    currentUser,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 