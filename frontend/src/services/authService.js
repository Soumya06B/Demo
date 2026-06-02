import apiClient from './apiClient';

export const authService = {
  login(credentials) {
    return apiClient.post('/auth/login', credentials);
  },

  register(payload) {
    return apiClient.post('/auth/register', payload);
  },

  profile() {
    return apiClient.get('/auth/me');
  },
};
