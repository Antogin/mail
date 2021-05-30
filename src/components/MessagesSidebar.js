const iconMap = {
  'sms': '📩',
  'phone': '📞',
  'email': '📧'
}

const contactMap = {
  'sms': '📩',
  'phone': '📞',
  'email': '📧'
}

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
      <div className="sticky top-16 bg-white overflow-x-hidden overflow-y-auto no-scrollbar flex-shrink-0 border-r border-gray-200 md:w-72" style={{ height: 'calc(100vh - 64px)' }}>
        <ul className="mb-6">
          {messages.map(message => {
            return (
              <li className="-mx-2" key={message.id}>
                <div className="flex items-center justify-between w-full p-2 rounded" onClick={() => onMessageClick(message)}>
                  <div className="flex mb-2">
                    <div className="m-5">
                      {iconMap[message.type]}
                    </div>
                    <div className="mt-1 pr-1">
                      <h2 className={`text-xl justify-center ${message.read ? null : 'font-bold'}`}>
                        {`${message.contact.firstname} ${message.contact.lastname}`}
                      </h2>
                      <div className="">
                        {truncateTxt(70, message.body)}
                      </div>
                    </div>
                    <div>
                      date
                    </div>
                  </div>
                </div>
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
