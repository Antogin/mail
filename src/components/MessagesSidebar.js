const messages = [
  {
    "body": "Lorem Ipsum #10100 is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    "contact": {
      "email": "wtaylor@gmail.com",
      "firstname": "William",
      "lastname": "Taylor",
      "phone": "0661983101"
    },
    "date": "2021-05-03T13:25:52.979855",
    "id": 10100,
    "read": false,
    "subject": "Appel #10100",
    "type": "phone"
  },
  {
    "body": "Lorem Ipsum #10101 is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    "contact": {
      "email": "mdavis@gmail.com",
      "firstname": "Michael",
      "lastname": "Davis",
      "phone": "0621446719"
    },
    "date": "2021-05-22T13:25:52.979880",
    "id": 10101,
    "read": false,
    "subject": "Appel #10101",
    "type": "phone"
  },
]

function MessagesSidebar({
  msgSidebarOpen,
  onMessageClick
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
        </ul>
      </div>
    </div>
  );
}

export default MessagesSidebar;
