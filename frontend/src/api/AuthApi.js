import axios from 'axios';

const API = axios.create({ baseURL: 'https://financial-tracker-4ood.onrender.com' });

export const login = ( formData ) => API.post('/api/login', formData);
export const register = ( formData ) => API.post('/api/register', formData); 
export const setBudgetLimit = ( limit, userId ) => API.post('/api/setLimit', { limit, userId });
