import ApolloClient, {InMemoryCache} from "apollo-boost"
import React, {Suspense} from "react"
import {ApolloProvider} from "react-apollo-hooks"
import {View} from "react-native"
import {ButtonGroup, Header, Icon, Text} from "react-native-elements"
import {useCurrentTab, useSetCurrentTab} from "./graphql"
import {Submissions, Submit} from "./pages"
import {defaults, resolvers} from "./resolvers"
import {colors} from "./theme"

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
const tabs: ITab[] = [
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

function MainView() {
    const {
        data: {currentTab}
    } = useCurrentTab()
    const setCurrentTab = useSetCurrentTab()

    return (
        <View style={{flex: 1}}>
            <Header
                backgroundColor={colors.primary}
                centerComponent={{
                    text: tabs[currentTab].name.toUpperCase(),
                    style: {
                        fontSize: 20,
                        color: "#fff"
                    }
                }}
            />
            {tabs[currentTab].component}
            <ButtonGroup
                onPress={index =>
                    setCurrentTab({
                        variables: {tab: index}
                    })
                }
                selectedIndex={currentTab}
                buttons={tabs.map(({buttonName, icon: {name, type}}) => ({
                    element: () => (
                        <View>
                            <Icon name={name} type={type} />
                            <Text
                                style={{
                                    marginTop: 5,
                                    fontSize: 12
                                }}>
                                {buttonName}
                            </Text>
                        </View>
                    )
                }))}
                containerStyle={{
                    height: 65,
                    marginRight: 0,
                    marginLeft: 0,
                    marginBottom: 0,
                    marginTop: 0
                }}
            />
        </View>
    )
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
