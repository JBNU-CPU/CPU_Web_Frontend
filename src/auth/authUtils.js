export const getAccessToken = () => localStorage.getItem("accessToken");

export const setAccessToken = (token) => {
  localStorage.setItem("accessToken", token);
};


export const clearAuth = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("username");
  localStorage.removeItem("role");
  localStorage.removeItem("isAdmin");
  localStorage.removeItem("isAuth");
};
