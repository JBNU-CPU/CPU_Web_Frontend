import React from "react";
import {useLocation} from "react-router-dom"; // 현재 경로 확인을 위한 import
import AppRoutes from "./approutes/AppRoutes";
import {AuthProvider} from "./AuthContext";
import {AdminProvider} from "./AdminContext";
import Header from "./components/Header"; // Header 컴포넌트 import
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "./api/queryClient";

const App = () => {
  const location = useLocation(); // 현재 경로 가져오기

  // 특정 페이지에서는 Header를 숨김 (예: "/login"과 "/register" 페이지)
  const hideHeaderRoutes = ["/party"];
  const shouldShowHeader = !hideHeaderRoutes.includes(location.pathname);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AdminProvider>
          {/* 특정 경로에서는 Header를 렌더링하지 않음 */}
          {shouldShowHeader && <Header />}
          <AppRoutes />
        </AdminProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
