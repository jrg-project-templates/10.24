import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import GameBoard from './GameBoard';
import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.render(<ChakraProvider>
  <GameBoard />
</ChakraProvider>, document.getElementById('root'));
