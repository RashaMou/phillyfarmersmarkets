import React from "react";
import logo from "../assets/images/logo.png";
import InfoModal from "./InfoModal";
import Sidebar from "./Sidebar";

const Header = ({ markets }) => {
  return (
    <header className="header">
      <Sidebar className="filter-drawer" markets={markets} />
      <img className="logo" src={logo} alt="Logo" />
      <InfoModal />
    </header>
  );
};

export default Header;
