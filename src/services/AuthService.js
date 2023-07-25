import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

class AuthService {
  login(email, password) {
    return axios
      .post(`${API_URL}/login`, { email, password })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
          localStorage.setItem('ACCESS_TOKEN',JSON.stringify(response.data.token))
        }

        return response.data;
      });
  }


  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('ACCESS_TOKEN')

  }

  register(name, email, password, role) {
    return axios.post(`${API_URL}/register`, { name, email, password, role });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();
