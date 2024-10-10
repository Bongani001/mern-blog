import { Children, createContext, useState } from "react";

export const NavbarContext = createContext();

export const NavbarContextProvider = ({ children }) => {
  const [showSideNav, setShowSideNav] = useState(false);

  const toggleNavbar = () => {
    setShowSideNav(!showSideNav);
  };

  return (
    <NavbarContext.Provider value={{ showSideNav, toggleNavbar }}>
      {children}
    </NavbarContext.Provider>
  );
};
