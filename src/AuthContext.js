import React, { createContext, useState } from 'react';
import { use } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [Id, setId] = useState(null);
  const [guestId, setGuestId] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, Id, setId, guestId, setGuestId }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
