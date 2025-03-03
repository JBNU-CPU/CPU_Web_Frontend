import React, { createContext, useState } from 'react';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [iscode, setIscode] = useState("1234");

  return (
    <AdminContext.Provider value={{ isAdmin, setIsAdmin, iscode, setIscode }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
