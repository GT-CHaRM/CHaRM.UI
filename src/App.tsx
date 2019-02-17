import ApolloClient, {InMemoryCache} from "apollo-boost"
import React, {Suspense} from "react"
import {ApolloProvider} from "react-apollo-hooks"
import {View} from "react-native"
import {Text} from "react-native-elements"
import {MainView} from "./MainView"
import {Submissions, Submit} from "./pages"
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

interface ITab {
    name: string
    buttonName: string
    icon: {
        name: string
        type: string
    }
    component: JSX.Element
}
export const tabs: ITab[] = [
    {
        name: "Submit Items",
        buttonName: "SUBMIT",
        icon: {
            name: "plus-square",
            type: "font-awesome"
        },
        component: <Submit />
    },
    {
        name: "Submission History",
        buttonName: "HISTORY",
        icon: {
            name: "history",
            type: "font-awesome"
        },
        component: <Submissions />
    },
    {
        name: "Profile",
        buttonName: "PROFILE",
        icon: {
            name: "user-circle",
            type: "font-awesome"
        },
        component: <View style={{flex: 1}} />
    }
]

export function App() {
    return (
        <ApolloProvider client={client}>
            <Suspense fallback={<Text>Loading...</Text>}>
                <MainView />
            </Suspense>
        </ApolloProvider>
    )
}
