import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../context/auth";
import { MessagesContext } from "../context/messages";

const body = "Lorem Ipsum #10101 is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."


function MessagesBody() {

  const { id } = useParams()
  const { realtor } = useContext(AuthContext);
  const { getMessage, message } = useContext(MessagesContext)


  useEffect(() => {
    if (id && realtor) {
      getMessage(realtor.id, id)
    }
  }, [id, realtor])


  return (
    <div className="flex-grow px-4 sm:px-6 md:px-5 py-6">
      {message ?
        <div className="text-sm bg-white p-3 mb-5 border border-gray-200 shadow-md">
          <div className="flex mb-2">
            <div className="m-5">📧</div>
            <div className="mt-1 pr-1">
              <h2 className={`text-xl justify-center`}>
                {`${message.contact.firstname} ${message.contact.lastname}`}
              </h2>
              <div className="">
                Email: {message.contact.email}
              </div>
              <div className="">
                Téléphone: {message.contact.phone}
              </div>
            </div>
          </div>
        </div>


        : null}
      <div className="text-sm bg-white p-3 border border-gray-200 shadow-md">
        {message?.body}
      </div>
    </div>
  );
}

export default MessagesBody;
