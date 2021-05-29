import { createContext, useEffect, useState } from "react";

const apiUrl = 'http://localhost:8080'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [realtors, setRealtors] = useState([])
    const [realtor, setRealtor] = useState(null)

    useEffect(() => {
        const savedRealtor = JSON.parse(localStorage.getItem('realtor'))
        if (savedRealtor) {
            setRealtor(savedRealtor)
        }
    }, [])

    const getRealtors = async () => {
        const data = await fetch(`${apiUrl}/realtors`)
        const realtorsResponse = await data.json()
        setRealtors(realtorsResponse)
    }

    const loginIn = async (id) => {
        const data = await fetch(`${apiUrl}/realtors/${id}`)

        const realtorResponse = await data.json()

        localStorage.setItem('realtor', JSON.stringify(realtorResponse))
        setRealtor(realtorResponse)
    }

    return <AuthContext.Provider value={{ loginIn, getRealtors, realtor, realtors }}>
        {children}
    </AuthContext.Provider>
}