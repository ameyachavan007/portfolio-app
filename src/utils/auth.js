import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (user) => {
    setUser(user);
  };

  //   useEffect(() => {
  //     // Check session
  //     axios
  //       .get("/api/check-session")
  //       .then((response) => setIsAuthenticated(true))
  //       .catch((error) => setIsAuthenticated(false));
  //   }, []);

  const logout = () => {
    // Implement logout functionality
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
