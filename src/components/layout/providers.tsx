"use client"

import Container from "../container"
import { ConnectedUserContextProvider } from "./context-provider"
import { SearchContextProvider } from "./context-provider/search-context-provider"
import { ThemeProvider } from "./theme-provider"

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider
            attribute="class"
            forcedTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
            <SearchContextProvider>
                <ConnectedUserContextProvider>
                    <Container>{children}</Container>
                </ConnectedUserContextProvider>
            </SearchContextProvider>
        </ThemeProvider>
    )
}
