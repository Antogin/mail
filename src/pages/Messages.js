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
  const { getMessages, messages, nextMessages, page } = useContext(MessagesContext)

  const hasNextPage = page !== 0;

  console.log('GA => hasNextPage', hasNextPage)
  console.log('GA => page', page)
  useEffect(() => {
    if (realtor) {
      getMessages(realtor?.id, {
        page_size: 20
      })
    }
  }, [realtor])



  const [scrollRef] = useInfiniteScroll({
    hasNextPage,
    onLoadMore: () => nextMessages(realtor?.id),
    rootMargin: '0px 0px 400px 0px',
  });


  const onMessageClick = (message) => {
    history.push(`/messages/${message.id}`);
  }

  const msgSidebarOpen = location.pathname === '/messages'

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={msgSidebarOpen} />
        <main className="relative flex">
          <MessagesSidebar scrollRef={scrollRef} messages={messages} onMessageClick={onMessageClick} msgSidebarOpen={msgSidebarOpen} />
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