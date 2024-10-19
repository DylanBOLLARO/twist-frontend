'use client'

import { createContext, useContext, useState } from 'react'

const ConnectedUserContext = createContext<any>(undefined)

export const ConnectedUserContextProvider = ({ children }: any) => {
    const [connectedUser, setConnectedUser] = useState<string | null>(null)

    return (
        <ConnectedUserContext.Provider
            value={{ connectedUser, setConnectedUser }}
        >
            {children}
        </ConnectedUserContext.Provider>
    )
}

export const useConnectedUserContext = () => {
    const connectedUserContext = useContext(ConnectedUserContext)
    if (connectedUserContext === undefined) {
        throw new Error(
            'useConnectedUserContext must be inside a ConnectedUserContextProvider'
        )
    }
    return connectedUserContext
}
