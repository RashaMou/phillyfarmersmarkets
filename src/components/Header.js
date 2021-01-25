import { InfoOutlineIcon } from '@chakra-ui/icons';
import React from 'react';
import logo from '../assets/images/logo.png';

const Header = () => {
  return ( 
    <header className="header">
        <div className="filter-drawer">
          <h2 className="filter-header">Filter Markets</h2>
        </div>
        <img className="logo" src={logo} alt="Logo" />
        <div className="info-icon">
        <InfoOutlineIcon w={8} h={8} color="#3dd47d"/>
        </div>

    </header>
  );
}
 
export default Header;

