import { STORAGE_KEYS } from '../constants/appConstants';
import { storage } from './storage';

export const tokenStorage = {
  getToken() {
    return storage.get(STORAGE_KEYS.AUTH_TOKEN);
  },

  setToken(token) {
    storage.set(STORAGE_KEYS.AUTH_TOKEN, token);
  },

  removeToken() {
    storage.remove(STORAGE_KEYS.AUTH_TOKEN);
  },
};
