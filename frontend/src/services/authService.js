import axios from "axios";

const BASE_URL = "http://localhost:8000/api/v1";

export const loginUser = async (formData) => {
  const response = await axios.post(`${BASE_URL}/users/login`, formData);
  return response.data;
};

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const generateResume = async (payload) => {
  const response = await axios.post(
    `${BASE_URL}/resume/generate`,
    payload,
    authHeader()
  );
  return response.data;
};

export const getAllResumes = async () => {
  const response = await axios.get(`${BASE_URL}/resume`, authHeader());
  return response.data;
};

export const getResumeById = async (resumeId) => {
  const response = await axios.get(
    `${BASE_URL}/resume/${resumeId}`,
    authHeader()
  );
  return response.data;
};

export const updateResume = async (resumeId, updateData) => {
  const response = await axios.put(
    `${BASE_URL}/resume/${resumeId}`,
    updateData,
    authHeader()
  );
  return response.data;
};

export const deleteResume = async (resumeId) => {
  const response = await axios.delete(
    `${BASE_URL}/resume/${resumeId}`,
    authHeader()
  );
  return response.data;
};
