import ApolloClient, {InMemoryCache} from "apollo-boost"
import React, {Suspense} from "react"
import {ApolloProvider} from "react-apollo-hooks"
import {Text} from "react-native-elements"
import {MainView} from "./MainView"
import {defaults, resolvers} from "./resolvers"

const cache = new InMemoryCache({
    dataIdFromObject: x => x.id
})

function makeClient(token: string | undefined) {
    const headers =
        token === undefined || token === ""
            ? {}
            : {
                  Authorization: `Bearer: ${token}`
              }

    return new ApolloClient({
        cache,
        uri: "http://localhost:5000/graphql",
        clientState: {
            resolvers,
            defaults
        },
        headers
    })
}

const client = makeClient(undefined)

function LoadingScreen() {
    return <Text>Loading...</Text>
}

export function App() {
    return (
        <ApolloProvider client={client}>
            <Suspense fallback={<Text>Loading...</Text>}>
                <MainView />
            </Suspense>
        </ApolloProvider>
    )
}
