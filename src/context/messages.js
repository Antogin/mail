import { createContext, useContext, useState } from "react";

const apiUrl = 'http://localhost:8080'

export const MessagesContext = createContext()

export const MessagesProvider = ({ children }) => {

    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState(null)

    const getMessages = async (userId, params = {}) => {

        console.log('GA =>', params)
        const url = new URL(`${apiUrl}/realtors/${userId}/messages`);

        url.search = new URLSearchParams(params).toString();

        const data = await fetch(url)

        const messagesResponse = await data.json()

        setMessages(messagesResponse)
    }

    const getMessage = async (userId, messageId, params) => {
        const data = await fetch(`${apiUrl}/realtors/${userId}/messages/${messageId}`)
        const messageResponse = await data.json()

        setMessage(messageResponse)
    }

    return <MessagesContext.Provider value={{ getMessages, messages, getMessage, message }}>
        {children}
    </MessagesContext.Provider>
}