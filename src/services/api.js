import axios from "axios";

const token = JSON.parse(localStorage.getItem('@twitter'))
const api = axios.create({
  baseURL: process.env.REACT_APP_URL,
  headers: {'Authorization': `Bearer ${token}`}
});

export default api;
