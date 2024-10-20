"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import axios from "axios"

import { useConnectedUserContext } from "./layout/context-provider"

interface ContainerProps {
    children: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({ children }) => {
    const { connectedUser, setConnectedUser } = useConnectedUserContext()
    const pathname = usePathname()

    async function getConnectedUser(at: string) {
        try {
            const response: any = await axios({
                method: "get",
                url: `${process.env.NEXT_PUBLIC_API + "/auth/me"}`,
                headers: {
                    Authorization: `Bearer ${at}`,
                },
            })
            return response
        } catch (error) {
            console.error(error)
        }
    }

    async function getNewTokens(rt: string) {
        try {
            const response: any = await axios({
                method: "post",
                url: `${process.env.NEXT_PUBLIC_API + "/auth/refresh"}`,
                headers: {
                    Authorization: `Bearer ${rt}`,
                },
            })
            return response
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        const fetchUser = async () => {
            if (!connectedUser) {
                if ("at_nutrit" in localStorage) {
                    const at_nutrit: any = localStorage.getItem("at_nutrit")
                    let response = await getConnectedUser(at_nutrit)
                    if (response?.status == 200) {
                        setConnectedUser(response?.data)
                    } else {
                        const rt_nutrit: any = localStorage.getItem("rt_nutrit")
                        response = await getNewTokens(rt_nutrit)
                        if (response?.status == 200) {
                            if (
                                Object.hasOwn(response?.data, "access_token") &&
                                Object.hasOwn(response?.data, "refresh_token")
                            ) {
                                localStorage.setItem(
                                    "at_nutrit",
                                    response?.data?.access_token
                                )
                                localStorage.setItem(
                                    "rt_nutrit",
                                    response?.data?.refresh_token
                                )
                            }

                            const at_nutrit: any = response?.data?.access_token
                            response = await getConnectedUser(at_nutrit)
                            if (response?.status == 200) {
                                setConnectedUser(response?.data)
                            } else {
                                localStorage.removeItem("at_nutrit")
                                localStorage.removeItem("rt_nutrit")
                            }
                        } else {
                            localStorage.removeItem("at_nutrit")
                            localStorage.removeItem("rt_nutrit")
                        }
                    }
                }
            }
        }
        fetchUser()
    }, [pathname, connectedUser])

    return children
}

export default Container
