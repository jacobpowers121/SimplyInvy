import React from 'react';
import {Observer, observer} from 'mobx-react-lite';
import { Route, Routes } from 'react-router-dom';
import LoginPage from "./containers/login/login-page";

const App: React.FC = observer(() => {

  return (
    <Observer>
      {() => (
        <>
          <Routes>
            <Route path="login" element={<LoginPage />} />
          </Routes>
        </>
      )}
    </Observer>
  );
});

export default App;
