import {
  Switch,
  Route,
  useHistory,
  useLocation,
  useParams
} from 'react-router-dom';

import Header from '../components/Header';
import MessagesSidebar from '../components/MessagesSidebar';
import MessagesBody from '../components/MessagesBody';
import { AuthContext } from '../context/auth';
import { useContext, useEffect } from 'react';
import { MessagesContext } from '../context/messages';

function Messages() {
  const history = useHistory();
  const location = useLocation();
  const params = useParams();

  const { realtor } = useContext(AuthContext);
  const { getMessages, messages } = useContext(MessagesContext)

  useEffect(() => {
    if (realtor) {
      getMessages(realtor?.id, {
        page_size: 20
      })
    }
  }, [realtor])


  const onMessageClick = (message) => {
    history.push(`/messages/${message.id}`);
  }

  const msgSidebarOpen = location.pathname === '/messages'

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={msgSidebarOpen} />
        <main className="relative flex">
          <MessagesSidebar messages={messages} onMessageClick={onMessageClick} msgSidebarOpen={msgSidebarOpen} />
          <Switch>
            <Route exact path="/messages/:id">
              <MessagesBody />
            </Route>
          </Switch>
        </main>
      </div>

    </div>
  );
}

export default Messages;