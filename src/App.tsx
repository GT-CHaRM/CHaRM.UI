import ApolloClient, {InMemoryCache} from "apollo-boost"
import React, {Suspense} from "react"
import {ApolloProvider} from "react-apollo-hooks"
import {Text} from "react-native-elements"
import {MainView} from "./MainView"
import {defaults, resolvers} from "./resolvers"

const cache = new InMemoryCache({
    dataIdFromObject: x => x.id
})

const client = new ApolloClient({
    cache,
    uri: "http://charm.nima.sh:5000/graphql",
    clientState: {
        resolvers,
        defaults
    }
})

export function App() {
    return (
        <ApolloProvider client={client}>
            <Suspense fallback={<Text>Loading...</Text>}>
                <MainView />
            </Suspense>
        </ApolloProvider>
    )
}
