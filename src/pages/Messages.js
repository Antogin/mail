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
import useInfiniteScroll from 'react-infinite-scroll-hook';

function Messages() {
  const history = useHistory();
  const location = useLocation();

  const { realtor } = useContext(AuthContext);
  const { getMessages, messages, nextMessages, page, readMessage } = useContext(MessagesContext);

  const hasNextPage = page !== 0;

  useEffect(() => {
    if (realtor) {
      getMessages(realtor?.id, {
        page_size: 20
      })
    }
  }, [realtor]);

  const [scrollRef] = useInfiniteScroll({
    hasNextPage,
    onLoadMore: () => nextMessages(realtor?.id),
  });

  const onMessageClick = (message) => {
    if (!message.read) {
      readMessage(realtor.id, message)
    }
    history.push(`/messages/${message.id}`);
  };

  const msgSidebarOpen = location.pathname === '/messages';

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header unreadMessages={realtor?.unread_messages} sidebarOpen={msgSidebarOpen} />
        <main className="relative flex">
          <MessagesSidebar
            scrollRef={scrollRef}
            messages={messages}
            onMessageClick={onMessageClick}
            msgSidebarOpen={msgSidebarOpen}
          />
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