import apiClient from './api';

export const authService = {
  register(payload) {
    return apiClient.post('/auth/register', payload);
  },

  verifyRegisterOtp(payload) {
    return apiClient.post('/auth/verify-register-otp', payload);
  },

  login(credentials) {
    return apiClient.post('/auth/login', credentials);
  },

  verifyLoginOtp(payload) {
    return apiClient.post('/auth/verify-login-otp', payload);
  },

  profile() {
    return apiClient.get('/auth/profile');
  },
};
