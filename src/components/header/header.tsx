"use client"

import Link from "next/link"
import { CirclePlus, LayoutGrid } from "lucide-react"

import { Button } from "@/components/ui/button"

import { useConnectedUserContext } from "../layout/context-provider"
import { AvatarConnectedUser } from "./avatar-connected-user"

export const Header = () => {
    const { connectedUser } = useConnectedUserContext()

    return (
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b px-4 md:px-6 z-20 bg-card font-bold">
            <nav className="flex items-center px-10 gap-10 w-full">
                <Link
                    href="/"
                    className="flex text-foreground transition-colors hover:text-foreground item-center space-x-3"
                >
                    <LayoutGrid />
                    <p className="hover:scale-105">TWIST</p>
                </Link>

                <Button asChild className="font-bold">
                    <Link href="/create-publication" className="space-x-3">
                        <CirclePlus />
                        <p>Publication</p>
                    </Link>
                </Button>
                {connectedUser && (
                    <>
                        <Link
                            href="/my-publications"
                            className=" text-foreground transition-colors hover:text-foreground  hover:scale-105"
                        >
                            My publications
                        </Link>
                        <Link
                            href="/my-favorites"
                            className=" text-foreground transition-colors hover:text-foreground hover:scale-105"
                        >
                            My favorites
                        </Link>
                    </>
                )}
            </nav>

            <div className="flex gap-3 ml-auto">
                {connectedUser && <AvatarConnectedUser />}
                {!connectedUser && (
                    <Button variant={"outline"} asChild>
                        <Link href="/auth">Login</Link>
                    </Button>
                )}
            </div>
        </header>
    )
}
export default Header
