import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { formatRelativeTime } from "../utils/date";
import { truncateTxt } from "../utils/ui";
import { AuthContext } from "./auth";

const apiUrl = 'http://localhost:8080'

export const MessagesContext = createContext()

export const MessagesProvider = ({ children }) => {

    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState(null)
    const [page, setPage] = useState(1)
    const { decrementReadCount } = useContext(AuthContext);

    const getMessages = useCallback(async (userId) => {
        const params = {
            sort: 'date:desc'
        }

        const url = new URL(`${apiUrl}/realtors/${userId}/messages`);
        url.search = new URLSearchParams(params).toString();

        const data = await fetch(url)


        const messagesResponse = await data.json()

        setMessages(messagesResponse)
        setPage(1)
    }, [setPage, setMessages])

    const nextMessages = useCallback(async (userId) => {
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
    }, [setPage, setMessages, messages, page])

    const readMessage = useCallback(async (userId, message) => {
        const { id, read, ...rest } = message
        await fetch(`${apiUrl}/realtors/${userId}/messages/${message.id}`, {
            method: 'PATCH',
            body: JSON.stringify({ ...rest, read: true })
        })

        const updatedMessages = messages.map((m) => {
            if (m.id === message.id && !m.read) {
                decrementReadCount()
                return {
                    ...m,
                    read: true
                }
            }
            return m
        })

        setMessages(updatedMessages)
    }, [setMessages, decrementReadCount, messages])

    const getMessage = useCallback(async (userId, messageId) => {
        const data = await fetch(`${apiUrl}/realtors/${userId}/messages/${messageId}`)
        const messageResponse = await data.json()

        if (!messageResponse.read) {
            readMessage(userId, messageResponse)
        }
        setMessage({ ...messageResponse, read: true })
    }, [readMessage, setMessage])


    const formatedMessages = useMemo(() => messages.map((message) => {
        return { ...message, truncatedText: truncateTxt(70, message.body), relativeDate: formatRelativeTime(new Date(message.date)) }
    }), [messages])

    return <MessagesContext.Provider value={{ page, getMessages, messages: formatedMessages, getMessage, message, nextMessages, readMessage }}>
        {children}
    </MessagesContext.Provider>
}