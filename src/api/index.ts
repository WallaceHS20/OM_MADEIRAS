import axios from 'axios';

export const ServiceApi  = axios.create({
  baseURL: 'http://localhost:3000',
});