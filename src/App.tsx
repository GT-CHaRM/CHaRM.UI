import React from "react"
import {View} from "react-native"
import {Text, Header, ButtonGroup, Icon} from "react-native-elements"
import ApolloClient, {gql, InMemoryCache} from "apollo-boost"
import {ApolloProvider} from "react-apollo"
import {colors} from "./theme"
import {Submit, Submissions} from "./pages"
import {CurrentTabComponent, SetCurrentTabComponent} from "./graphql"
import {resolvers, defaults} from "./resolvers"
import Login from "./pages/Login";

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
    }, 
    {
        name: "Login",
        buttonName: "LOGIN",
        icon: {
            name: "plus-square",
            type: "font-awesome"
        },
        component: <Login />
    }
]

export const App = () => (
    <ApolloProvider client={client}>
        <CurrentTabComponent>
            {({data: {currentTab}}) => (
                <SetCurrentTabComponent>
                    {setCurrentTab => (
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
                                buttons={tabs.map(
                                    ({buttonName, icon: {name, type}}) => ({
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
                                    })
                                )}
                                containerStyle={{
                                    height: 65,
                                    marginRight: 0,
                                    marginLeft: 0,
                                    marginBottom: 0,
                                    marginTop: 0
                                }}
                            />
                        </View>
                    )}
                </SetCurrentTabComponent>
            )}
        </CurrentTabComponent>
    </ApolloProvider>
)
