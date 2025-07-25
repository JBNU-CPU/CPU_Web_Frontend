import axios from "axios";
import {
  getAccessToken,
  setAccessToken,
  clearAuth
} from "../auth/authUtils";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

export default axiosInstance;

// 요청 인터셉터: accessToken 포함
axiosInstance.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers["authorization"] = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터: access 만료 시 /reissue 자동 호출
axiosInstance.interceptors.response.use(
  (response) => {
    const newAccess = response.headers["authorization"];
    if (newAccess?.startsWith("Bearer ")) {
      setAccessToken(newAccess.replace("Bearer ", ""));
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      error.response.headers["access-token-expired"] &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const res = await axiosInstance.post("/reissue");
        const newAccess = res.headers["authorization"];
        if (newAccess?.startsWith("Bearer ")) {
          const token = newAccess.replace("Bearer ", "");
          setAccessToken(token);
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          return axiosInstance(originalRequest); // 원래 요청 재시도
        }
      } catch (err) {
        clearAuth(); // refresh도 만료됨
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
