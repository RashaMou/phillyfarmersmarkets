import {
  useDisclosure
} from "@chakra-ui/react";
import React from 'react';
import logo from '../assets/images/logo.png';
import InfoModal from './InfoModal';

const Header = () => {
  const { onOpen } = useDisclosure()

  return ( 
    <header className="header">
        <div className="filter-drawer">
          <h2 className="filter-header">Filter Markets</h2>
        </div>
        <img className="logo" src={logo} alt="Logo" />
        <InfoModal />
    </header>
  );
}
 
export default Header;

