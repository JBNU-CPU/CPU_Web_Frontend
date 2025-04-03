import axiosInstance from "../axios";

export const fetchSessions = async (page, size) => {
  const response = await axiosInstance.get(`/study?studyType=session&page=${page - 1}&size=${size}`, {
    withCredentials: true,
  });

  return response.data;
};

export const fetchSession = async id => {
  const response = await axiosInstance.get(`/study/${id}`, {
    withCredentials: true,
  });

  return response.data;
};
