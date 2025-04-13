import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserStore } from './stores/user-store';
import { createContext } from 'react';

// Create a React Context for your MobX store, so you can provide it to your app.
export const StoreContext = createContext({
  userStore: new UserStore(),
});

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <StoreContext.Provider value={{ userStore: new UserStore() }}>
      <App />
    </StoreContext.Provider>
  </React.StrictMode>
);
