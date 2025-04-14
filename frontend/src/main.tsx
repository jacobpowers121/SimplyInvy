import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserStore } from './stores/user-store';
import { createContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

export const StoreContext = createContext({
  userStore: new UserStore(),
});

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <StoreContext.Provider value={{ userStore: new UserStore() }}>
      <Router>
        <App />
      </Router>
    </StoreContext.Provider>
  </React.StrictMode>
);
