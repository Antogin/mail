import {
  Switch,
  Route,
  useHistory,
  useLocation
} from 'react-router-dom';

import Header from '../components/Header';
import MessagesSidebar from '../components/MessagesSidebar';
import MessagesBody from '../components/MessagesBody';

function Messages() {
  const history = useHistory();
  const location = useLocation();

  const onMessageClick = (message) => {
    history.push(`/messages/${message.id}`);
  }

  const msgSidebarOpen = location.pathname === '/messages'

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={msgSidebarOpen} />
        <main>
          <div className="relative flex">
            <MessagesSidebar onMessageClick={onMessageClick} msgSidebarOpen={msgSidebarOpen} />
            <Switch>
              <Route exact path="/messages/:id">
                <MessagesBody />

              </Route>
            </Switch>

          </div>
        </main>

      </div>

    </div>
  );
}

export default Messages;