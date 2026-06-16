import { createContext, useCallback, useMemo, useState } from 'react';
import { STORAGE_KEYS } from '../constants/appConstants';
import { storage } from '../utils/storage';
import { tokenStorage } from '../utils/tokenStorage';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => storage.get(STORAGE_KEYS.AUTH_USER));
  const [token, setToken] = useState(() => storage.get(STORAGE_KEYS.AUTH_TOKEN));

  const login = useCallback((authData) => {
    const nextUser = authData.user;
    const nextToken = authData.token;

    setUser(nextUser);
    setToken(nextToken);
    storage.set(STORAGE_KEYS.AUTH_USER, nextUser);
    tokenStorage.setToken(nextToken);
  }, []);

  const updateUser = useCallback((nextUser) => {
    setUser(nextUser);
    storage.set(STORAGE_KEYS.AUTH_USER, nextUser);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    storage.remove(STORAGE_KEYS.AUTH_USER);
    tokenStorage.removeToken();
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      login,
      updateUser,
      logout,
    }),
    [login, logout, token, updateUser, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
