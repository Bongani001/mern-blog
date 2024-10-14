import { Children, createContext, useState } from "react";

export const NavbarContext = createContext();

export const NavbarContextProvider = ({ children }) => {
  const [showSideNav, setShowSideNav] = useState(false);
  const [selectedPage, setSelectedPage] = useState("homepage");

  const toggleNavbar = () => {
    setShowSideNav(!showSideNav);
  };

  return (
    <NavbarContext.Provider
      value={{ showSideNav, toggleNavbar, selectedPage, setSelectedPage }}
    >
      {children}
    </NavbarContext.Provider>
  );
};
