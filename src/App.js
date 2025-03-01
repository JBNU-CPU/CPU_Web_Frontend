import React from "react";
import AppRoutes from "./approutes/AppRoutes";
import { AuthProvider } from './AuthContext';
import { AdminProvider } from './AdminContext';
import Header from './components/Header'; // Header 컴포넌트 import

const App = () => {
  return (
    <>
      <AuthProvider>
        <AdminProvider>
          {/* Header를 AppRoutes 위에 추가 */}
          <Header />
          <AppRoutes />
        </AdminProvider>
      </AuthProvider>
    </>
  );
};

export default App;
