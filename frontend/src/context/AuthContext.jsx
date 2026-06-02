import { createContext, useCallback, useMemo, useState } from 'react';
import { STORAGE_KEYS } from '../constants/appConstants';
import { storage } from '../utils/storage';

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
    storage.set(STORAGE_KEYS.AUTH_TOKEN, nextToken);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    storage.remove(STORAGE_KEYS.AUTH_USER);
    storage.remove(STORAGE_KEYS.AUTH_TOKEN);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [login, logout, token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
