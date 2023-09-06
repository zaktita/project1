import axios from 'axios';

// const API_BASE_URL = process.env.REACT_APP_APIBASEURL;
// export const API_BASE_URL = 'http://127.0.0.1:8000';
export const API_BASE_URL = 'https://apiskyzoo.digitaleflame.com';

// // Get the CSRF token from the meta tag
// const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

// // Set the CSRF token as a default header for all Axios requests
// axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

const axiosClient = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  // withCredentials: true, // This ensures that cookies (including CSRF token) are sent with the request
});

export default axiosClient;
