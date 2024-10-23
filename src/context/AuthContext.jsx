import { createContext, useEffect, useState } from "react";
import * as jose from "jose";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let data = localStorage.getItem("userInfo");
    data = JSON.parse(data);

    const verifyToken = async (token) => {
      try {
        const secret = new TextEncoder().encode(
          import.meta.env.VITE_JWT_SECRET
        );
        const { payload } = await jose.jwtVerify(token, secret);
        setUser(data);
      } catch (error) {
        setUser(null);
      }
    };

    if (data != null) {
      verifyToken(data.token);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
