import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './reset.css';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from './contexts/AuthContext';
import { store } from './store';
import { Provider } from 'react-redux';
// import {AuthProvider} from '../src/contexts/AuthContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </Provider>
);
