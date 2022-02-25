import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import  { extendTheme, ChakraProvider } from '@chakra-ui/react';
import store from './store';
import App from './App';

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })

export const StoreContext = React.createContext();

ReactDOM.render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </StoreContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


