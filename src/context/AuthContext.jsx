import { createContext, useEffect, useState } from "react";
import * as jose from "jose";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let data = localStorage.getItem("userInfo");
    if (data != null) {
      data = JSON.parse(data);
      const tokenValid = verifyToken(data.token);
      if (tokenValid != null) {
        setUser(data);
      } else {
        setUser(null);
        localStorage.removeItem("userInfo");
      }
    } else {
      setUser(null);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      const secret = new TextEncoder().encode(import.meta.env.VITE_JWT_SECRET);
      const { payload } = await jose.jwtVerify(token, secret);

      // Decode and return the payload
      return jwtDecode(token);
    } catch (error) {
      return null;
    }
  };
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
