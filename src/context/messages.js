import { createContext, useContext, useState } from "react";
import { AuthContext } from "./auth";

const apiUrl = 'http://localhost:8080'

export const MessagesContext = createContext()

export const MessagesProvider = ({ children }) => {

    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState(null)
    const [page, setPage] = useState(1)
    const { decrementReadCount } = useContext(AuthContext);

    const getMessages = async (userId) => {
        const params = {
            sort: 'date:desc'
        }

        const url = new URL(`${apiUrl}/realtors/${userId}/messages`);
        url.search = new URLSearchParams(params).toString();

        const data = await fetch(url)


        const messagesResponse = await data.json()

        setMessages(messagesResponse)
        setPage(1)
    }

    const nextMessages = async (userId) => {
        const nextPage = page + 1;

        const params = {
            page: nextPage,
            sort: 'date:desc'
        }

        const url = new URL(`${apiUrl}/realtors/${userId}/messages`);

        url.search = new URLSearchParams(params).toString();

        const data = await fetch(url)

        const messagesResponse = await data.json()


        setMessages([...messages, ...messagesResponse])
        if (messagesResponse.length === 0) {
            setPage(0)
        } else {
            setPage(nextPage)
        }
    }

    const getMessage = async (userId, messageId, params) => {
        const data = await fetch(`${apiUrl}/realtors/${userId}/messages/${messageId}`)
        const messageResponse = await data.json()

        if(!messageResponse.read){
            readMessage(userId, messageResponse)
        }
        setMessage({ ...messageResponse, read: true })
    }

    const readMessage = async (userId, message) => {
        const { id, read, ...rest } = message
        await fetch(`${apiUrl}/realtors/${userId}/messages/${message.id}`, {
            method: 'PATCH',
            body: JSON.stringify({ body: 'test', read: true })
        })

        const updatedMessages = messages.map((m) => {
            if (m.id === message.id) {
                return {
                    ...m,
                    read: true
                }
            }
            return m
        })

        setMessages(updatedMessages)
        decrementReadCount()
    }

    return <MessagesContext.Provider value={{ page, getMessages, messages, getMessage, message, nextMessages, readMessage }}>
        {children}
    </MessagesContext.Provider>
}