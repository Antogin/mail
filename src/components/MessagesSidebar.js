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
      <div className="sticky top-16 bg-white overflow-x-hidden overflow-y-auto no-scrollbar flex-shrink-0 border-r border-gray-200 md:w-72" style={{ height: 'calc(100vh - 64px)' }}>
        <ul className="mb-6">
          {messages.map(message => {
            return (
              <li className="-mx-2" key={message.id}>
                <button className="flex items-center justify-between w-full p-2 rounded" onClick={() => onMessageClick(message)}>
                  <div className="flex items-center">
                    <div className="truncate">
                      <span className="text-sm font-medium text-gray-800">{message.contact.email}</span>
                    </div>
                  </div>
                </button>
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
