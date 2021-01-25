import { ChakraProvider } from "@chakra-ui/react";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/styles/index.scss';

const title = "Philly Farmer's Markets";

ReactDOM.render(
  <ChakraProvider>
  <App title={title}/>
  </ChakraProvider>,
  document.getElementById('app')
);

module.hot.accept();