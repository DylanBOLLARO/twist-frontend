'use client'

import Container from '../container'
import { ThemeProvider } from './theme-provider'
import { SearchContextProvider } from './context-provider/search-context-provider'
import { ConnectedUserContextProvider } from './context-provider'

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
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
