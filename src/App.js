import {
  Switch,
  Route,
  BrowserRouter,
} from 'react-router-dom';

import './App.scss';

// Import pages
import Messages from './pages/Messages';
import Login from './pages/Login';

function App() {
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
