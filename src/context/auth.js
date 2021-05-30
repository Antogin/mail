import { createContext, useCallback, useEffect, useState } from "react";

const apiUrl = 'http://localhost:8080'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [realtors, setRealtors] = useState([])
    const [realtor, setRealtor] = useState(null)
    const [unreadCount, setUreadCount] = useState(0)

    const loginIn = useCallback(async (id) => {
        const data = await fetch(`${apiUrl}/realtors/${id}`)

        const realtorResponse = await data.json()

        localStorage.setItem('realtor', JSON.stringify(realtorResponse))
        setRealtor(realtorResponse)
        setUreadCount(realtorResponse.unread_messages)

    }, [setRealtor, setUreadCount])

    useEffect(() => {
        const savedRealtor = JSON.parse(localStorage.getItem('realtor'))
        if (savedRealtor) {
            loginIn(savedRealtor.id)
        }
    }, [loginIn])


    const getRealtors = useCallback(async () => {
        const data = await fetch(`${apiUrl}/realtors`)
        const realtorsResponse = await data.json()
        setRealtors(realtorsResponse)
    }, [setRealtors])


    const decrementReadCount = useCallback(() => {
        if (unreadCount) {
            setUreadCount(unreadCount - 1)
        }
    }, [setUreadCount, unreadCount])

    return <AuthContext.Provider value={{ loginIn, getRealtors, realtor, realtors, decrementReadCount, unreadCount }}>
        {children}
    </AuthContext.Provider>
}