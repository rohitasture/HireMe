import axios from "axios";
const newRequest = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_BASE_URL,
});
newRequest.interceptors.request.use((req) => {
  if (localStorage.getItem("currentUser")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("currentUser")).token
    }`;
  }

  return req;
});
export default newRequest;
