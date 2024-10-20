"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

import { useConnectedUserContext } from "@/components/layout/context-provider"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { connectedUser } = useConnectedUserContext()
    const router = useRouter()

    useEffect(() => {
        const isConnectedUser = async () => {
            if (!(await connectedUser)) {
                router.push("/auth")
            }
        }
        isConnectedUser()
    }, [connectedUser])

    return children
}
