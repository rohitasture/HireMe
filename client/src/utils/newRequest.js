import axios from "axios";
const newRequest = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_BASE_URL,
  withCredentials: true,
});
export default newRequest;
