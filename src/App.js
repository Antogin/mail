import {
  Switch,
  Route,
  BrowserRouter,
} from 'react-router-dom';

import './App.scss';

// Import pages
import Messages from './pages/Messages';

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/messages">
            <Messages />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
