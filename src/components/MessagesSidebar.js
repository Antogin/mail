import { Link } from "react-router-dom";
import { formatRelativeTime } from "../utils/date";
import { iconMap } from "../utils/ui";

const truncateTxt = (length, initialText) => {
  const txt = initialText.substring(0, length);
  return `${txt} ...`
}
function MessagesSidebar({
  msgSidebarOpen,
  onMessageClick,
  messages,
  scrollRef
}) {
  return (
    <div
      id="messages-sidebar"
      className={`absolute z-20 top-0 bottom-0 w-full md:w-auto md:static md:top-auto md:bottom-auto -mr-px md:translate-x-0 transform transition-transform duration-200 ease-in-out ${msgSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <div className="sticky top-16 bg-white overflow-x-hidden overflow-y-auto no-scrollbar flex-shrink-0 border-r border-gray-200 md:w-96" style={{ height: 'calc(100vh - 64px)' }}>
        <ul className="mb-6">
          {messages.map(message => {
            return (
              <li className="-mx-2" key={message.id}>
                <Link className="flex items-center justify-between w-full p-2 rounded message-item"
                  to={`/messages/${message.id}`}>
                  <div className="flex mb-2">
                    <div className="m-5">
                      <i className={`mypro-icon mypro-icon-${iconMap[message.type]} ${message.read ? 'text-gray-500' : 'text-blue-500'}`}></i>
                    </div>
                    <div className="mt-1 pr-1">
                      <div className="flex justify-between">
                        <h2 className={`text-xl ${message.read ? null : 'font-bold'}`}>

                          {`${message.contact.firstname} ${message.contact.lastname}`}
                        </h2>

                        <span>
                          {formatRelativeTime(new Date(message.date))}
                        </span>
                      </div>

                      <div className="font-semibold text-xs	">
                        {message.type === 'phone' ? 'Appel téléphonique depuis MeilleursAgents' : 'Message sur votre vitrine MeilleursAgents'}
                      </div>
                      <div className="text-gray-400">
                        {truncateTxt(70, message.body)}
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            )
          })}
          <li ref={scrollRef}>
            loading
          </li>
        </ul>
      </div>
    </div>
  );
}

export default MessagesSidebar;
