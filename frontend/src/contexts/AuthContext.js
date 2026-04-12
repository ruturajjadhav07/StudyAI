import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  //Token restoration
  useEffect(() => {
    try {
      const stored = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      if (stored && token) {
        setUser(JSON.parse(stored));
      }
    } catch {
      localStorage.clear();
    } finally {
      setReady(true);
    }
  }, []);

  const loginUser = (responseData) => {
    const { token, name, email, userId } = responseData.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify({ token, name, email, userId }));
    setUser({ token, name, email, userId });
  };

  const logoutUser = () => {
    localStorage.clear();
    setUser(null);
  };

  if (!ready) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-10 h-10 border-4 border-slate-200 border-t-indigo-500 
                      rounded-full animate-spin-custom" />
    </div>
  );

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);