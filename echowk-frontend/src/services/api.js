import axios from 'axios';

// IMPORTANT: Replace this with the actual URL of your backend API
const API_URL = 'http://localhost:5000/api'; 

export const signupUser = async (userData) => {
  // IMPORTANT: Replace '/users/register' with your actual signup endpoint
  return await axios.post(`${API_URL}/users/register`, userData);
};

export const loginUser = async (credentials) => {
  // IMPORTANT: Replace '/auth/login' with your actual login endpoint
  return await axios.post(`${API_URL}/auth/login`, credentials);
};

export const getSkills = async () => {
  // IMPORTANT: Replace '/skills' with your actual endpoint for fetching skills
  return await axios.get(`${API_URL}/skills`);
};