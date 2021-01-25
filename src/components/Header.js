import {
  useDisclosure
} from "@chakra-ui/react";
import React from 'react';
import logo from '../assets/images/logo.png';
import InfoModal from './InfoModal';
import Sidebar from './Sidebar';

const Header = () => {
  const { onOpen } = useDisclosure()

  return ( 
    <header className="header">
        <Sidebar className="filter-drawer"/>
        <img className="logo" src={logo} alt="Logo" />
        <InfoModal />
    </header>
  );
}
 
export default Header;

