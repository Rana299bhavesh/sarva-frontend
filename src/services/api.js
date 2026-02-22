import axios from 'axios';

const API = axios.create({ baseURL: 'https://sarva-backend-ic6r.onrender.com/api' });

export const fetchInsights = (teacherId = '') => 
  API.get(`/insights${teacherId ? `?teacher_id=${teacherId}` : ''}`);

export const fetchTeachers = () => API.get('/teachers');

export const uploadData = (records) => API.post('/upload', { records });