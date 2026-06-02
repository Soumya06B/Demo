import apiClient from './apiClient';

export const dashboardService = {
  getSummary() {
    return apiClient.get('/dashboard/summary');
  },
};
