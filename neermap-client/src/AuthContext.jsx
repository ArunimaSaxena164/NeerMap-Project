import { createContext, useContext, useState, useEffect } from "react";
import API from "./api.js";
import { toast } from "react-toastify";
import { toastErrorOptions, toastSuccessOptions } from "./toastUtils.js";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await API.get("/api/auth/check");
      setUser(res.data.user || null);
    } catch {
      setUser(null);
    }
  };

  const login = async (username, password) => {
    try {
      await API.post("/api/auth/login", { username, password });
      await fetchUser(); 
    } catch (err) {
      throw err;
    }
  };

  const register = async (username,email, password) => {
    try {
      await API.post("/api/auth/register", { username,email, password });
      await fetchUser();
    } catch (err) {
      throw err;
    }
  };

  const logout = async () => {
    try {
      await API.post("/api/auth/logout");
      setUser(null);
       toast.success("Logged out successfully!", toastSuccessOptions);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, fetchUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
