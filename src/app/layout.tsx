import type { Metadata } from "next"

import "../styles/globals.css"
import { siteConfig } from "@/config"

import { Header } from "@/components/header"
import Providers from "@/components/layout/providers"

interface RootLayoutProps {
    children: React.ReactNode
}

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: ["Next.js", "React", "Tailwind CSS", "Radix UI"],
    creator: "BOLLARO Dylan",
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`antialiased font-montserratMedium`}>
                <Providers>
                    <Header />
                    <div className="flex flex-col w-full items-center">
                        <div className="flex flex-col w-full max-w-7xl py-5">
                            {children}
                        </div>
                    </div>
                </Providers>
            </body>
        </html>
    )
}
