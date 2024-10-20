"use client"

import { createContext, useContext, useEffect, useState } from "react"

const ConnectedUserContext = createContext<any>(undefined)

export const ConnectedUserContextProvider = ({ children }: any) => {
    const [connectedUser, setConnectedUser] = useState<any | undefined>(
        undefined
    )
    const getListOfMyIdOrSlug = (connectedUser: any) => {
        return connectedUser?.homeDetails?.map((item: any) => item?.slug)
    }

    const [listOfMyIdOrSlug, setListOfMyIdOrSlug] = useState<any>(
        getListOfMyIdOrSlug(connectedUser)
    )

    useEffect(() => {
        setListOfMyIdOrSlug(getListOfMyIdOrSlug(connectedUser))
    }, [connectedUser])

    return (
        <ConnectedUserContext.Provider
            value={{
                connectedUser,
                setConnectedUser,
                setListOfMyIdOrSlug,
                listOfMyIdOrSlug,
            }}
        >
            {children}
        </ConnectedUserContext.Provider>
    )
}

export const useConnectedUserContext = () => {
    const connectedUserContext = useContext(ConnectedUserContext)
    if (connectedUserContext === undefined) {
        throw new Error(
            "useConnectedUserContext must be inside a ConnectedUserContextProvider"
        )
    }
    return connectedUserContext
}
