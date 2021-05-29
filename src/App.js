import { useContext } from 'react';
import {
  Switch,
  Route,
  BrowserRouter,
} from 'react-router-dom';

import './App.scss';
import { AuthContext } from './context/auth';

// Import pages
import Messages from './pages/Messages';
import Login from './pages/Login';

function App() {
  const { loginIn, getRealtors, realtor } = useContext(AuthContext)

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/messages">
            <Messages />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
