'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AvatarConnectedUser } from './avatar-connected-user'
import { useConnectedUserContext } from '../layout/context-provider'

export const Header = () => {
    const { connectedUser } = useConnectedUserContext()

    return (
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b px-4 md:px-6 z-20 bg-card">
            <nav className="flex items-center px-10 gap-10 w-full">
                <Link
                    href="/"
                    className="text-xl text-foreground transition-colors hover:text-foreground font-bold hover:scale-105"
                >
                    TWIST
                </Link>

                <Button asChild>
                    <Link href="/host/homes">Twist your home</Link>
                </Button>
            </nav>

            <div className="flex gap-3 ml-auto">
                {connectedUser && <AvatarConnectedUser />}
                {!connectedUser && (
                    <Button variant={'outline'} asChild>
                        <Link href="/auth">Login</Link>
                    </Button>
                )}
            </div>
        </header>
    )
}
export default Header
