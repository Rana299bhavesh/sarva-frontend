import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const fetchInsights = (teacherId = '') => 
  API.get(`/insights${teacherId ? `?teacher_id=${teacherId}` : ''}`);

export const fetchTeachers = () => API.get('/teachers');

export const uploadData = (records) => API.post('/upload', { records });