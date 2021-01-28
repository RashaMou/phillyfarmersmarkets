import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ markets, children }) => {
  return (
    <div className="wrapper">
      <Header markets={markets} />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
