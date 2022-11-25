import { useState, createContext, useEffect, useContext } from 'react';

export const AuthContext = createContext('');

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState('mytoken');
  const [loggedIn, setLoggedIn] = useState(false);

  const login = (data)=> {
    setLoggedIn(true)
    setToken(data)
  }



  return <AuthContext.Provider value={{ token, loggedIn }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext)
