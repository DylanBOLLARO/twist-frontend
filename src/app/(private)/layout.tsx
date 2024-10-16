'use client'

import { useConnectedUserContext } from '@/components/layout/providers'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

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
                router.push('/auth')
            }
        }
        isConnectedUser()
    }, [connectedUser])

    return <>{children}</>
}
