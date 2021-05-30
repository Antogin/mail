import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../context/auth";
import { MessagesContext } from "../context/messages";
import format from 'date-fns/format'
import { iconMap } from "../utils/ui";

function MessagesBody() {

  const { id } = useParams()
  const { realtor } = useContext(AuthContext);
  const { getMessage, message } = useContext(MessagesContext)

  useEffect(() => {
    if (id && realtor) {
      getMessage(realtor.id, id)
    }
    // eslint-disable-next-line
  }, [id, realtor])

  return (
    <div className="flex-grow px-4 sm:px-6 md:px-5 py-6 bg-gray-200">
      {message ?
        <div className="text-sm bg-white p-3 mb-5 ">
          <div className="flex mb-2">
            <div className="mt-2 mx-5 flex text-5xl">
              <i className={`mypro-icon mypro-icon-${iconMap[message.type]} text-blue-500`}></i>
            </div>
            <div className="mt-1 pr-1">
              <h2 className={`text-xl justify-center font-bold`}>
                {`${message.contact.firstname} ${message.contact.lastname}`}
              </h2>
              <div className="flex justify-between w-72">
                <div>Email: </div>
                <div className="text-blue-500">{message.contact.email}</div>
              </div>
              <div className="flex justify-between w-72">
                <div> Téléphone: </div>
                <div className="text-blue-500"> {message.contact.phone} </div>
              </div>
            </div>
          </div>
        </div>
        : null}

      <div className="text-sm bg-white p-5 message-content">
        <h2 className="text-xl justify-center mb-2 bold">
          {`${message?.contact?.firstname} ${message?.contact?.lastname}`}
        </h2>
        <div className="mb-2">
          {message?.date ? format(new Date(message.date), 'cc LLLL uuuu KK:mm') : null}
        </div>
        {message?.body}
      </div>
    </div>
  );
}

export default MessagesBody;
