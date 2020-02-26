import axios from 'axios';

const AXIOS = axios.create({
  baseURL: 'https://localhost:44385',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export default AXIOS;