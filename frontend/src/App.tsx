import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { StoreContext } from './main';

const App: React.FC = observer(() => {
  const { userStore } = useContext(StoreContext);

  return (
    <div>
      <h1>Inventory Management App</h1>
      <p>Welcome, {userStore.user ? userStore.user.name : 'Guest'}!</p>
      <button onClick={() => userStore.login({ name: 'Alice', email: 'alice@example.com' })}>
        Log In as Alice
      </button>
    </div>
  );
});

export default App;
