import ApolloClient, {InMemoryCache} from "apollo-boost"
import React, {Suspense, useState} from "react"
import {ApolloProvider} from "react-apollo-hooks"
import {Text, ThemeProvider} from "react-native-elements"
import {MainView} from "./MainView"
import {defaults, resolvers} from "./resolvers"
import {TokenContext} from "./TokenContext"

const cache = new InMemoryCache({
    dataIdFromObject: x => x.Id
})

function makeClient(token: string | undefined) {
    return new ApolloClient({
        cache,
        uri: "http://143.215.127.168:5000/graphql",
        clientState: {
            resolvers,
            defaults
        },
        headers: {
            Authorization: token ? `Bearer ${token}` : ""
        }
    })
}

export function App() {
    const [token, setToken] = useState("")

    return (
        <ApolloProvider client={makeClient(token)}>
            <Suspense fallback={<Text>Text...</Text>}>
                <ThemeProvider
                    theme={{
                        colors: {
                            primary: "green"
                        }
                    }}>
                    <TokenContext.Provider value={setToken}>
                        <MainView />
                    </TokenContext.Provider>
                </ThemeProvider>
            </Suspense>
        </ApolloProvider>
    )
}
