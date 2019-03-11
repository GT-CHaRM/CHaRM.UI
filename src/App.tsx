import {
    InMemoryCache,
    IntrospectionFragmentMatcher
} from "apollo-cache-inmemory"
import {ApolloClient} from "apollo-client"
import {ApolloLink} from "apollo-link"
import {onError} from "apollo-link-error"
import {HttpLink} from "apollo-link-http"
import React, {useEffect} from "react"
import {ApolloProvider} from "react-apollo-hooks"
import {ActivityIndicator, AsyncStorage, StatusBar, View} from "react-native"
import {Icon, ThemeProvider} from "react-native-elements"
import {
    createAppContainer,
    createBottomTabNavigator,
    createSwitchNavigator,
    NavigationScreenProps
} from "react-navigation"
import introspectionQueryResultData from "./graphql"
import {
    Login,
    ProfilePage as Profile,
    Register,
    Submissions,
    Submit
} from "./pages"
import {resolvers} from "./resolvers"
import {tokenExpired} from "./util"

function makeClient(token: string | undefined) {
    return new ApolloClient({
        connectToDevTools: true,
        link: ApolloLink.from([
            onError(({graphQLErrors, networkError}) => {
                if (graphQLErrors)
                    graphQLErrors.map(({message, locations, path}) =>
                        console.log(
                            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                        )
                    )
                if (networkError) {
                    console.log(`[Network error]: ${networkError}`)
                }
            }),
            new HttpLink({
                uri: "http://192.168.0.117:5000/graphql",
                credentials: "include",

                headers: {
                    Authorization: token ? `Bearer ${token}` : ""
                }
            })
        ]),
        resolvers,

        cache: new InMemoryCache({
            dataIdFromObject: x => (x as any).Id,
            fragmentMatcher: new IntrospectionFragmentMatcher({
                introspectionQueryResultData
            })
        })
    })
}

const AuthNavigator = createBottomTabNavigator(
    {
        Login: {
            screen: Login,
            navigationOptions: {
                title: "Login",
                tabBarIcon: <Icon type="font-awesome" name="sign-in" />
            }
        },
        Register: {
            screen: Register,
            navigationOptions: {
                title: "Register",
                tabBarIcon: <Icon type="font-awesome" name="user-plus" />
            }
        }
    },
    {
        initialRouteName: "Login"
    }
)

const AppNavigator = createBottomTabNavigator(
    {
        Submit: {
            screen: Submit,
            navigationOptions: {
                title: "Submit",
                tabBarIcon: <Icon type="font-awesome" name="cart-plus" />
            }
        },
        Submissions: {
            screen: Submissions,
            navigationOptions: {
                title: "History",
                tabBarIcon: <Icon type="font-awesome" name="list-alt" />
            }
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                title: "Profile",
                tabBarIcon: <Icon type="font-awesome" name="user" />
            }
        }
    },
    {
        initialRouteName: "Submit"
    }
)

function AuthLoadingScreen(props: NavigationScreenProps) {
    useEffect(() => {
        ;(async () => {
            const identityToken = await AsyncStorage.getItem("Token")
            if (!identityToken || tokenExpired(identityToken)) {
                props.navigation.navigate("Auth", {identityToken: undefined})
            } else {
                props.navigation.navigate("App", {identityToken})
            }
        })()
    }, [])
    return (
        <View>
            <ActivityIndicator />
            <StatusBar barStyle="default" />
        </View>
    )
}

function AuthWrapper(props: NavigationScreenProps) {
    return (
        <ApolloProvider
            client={makeClient(props.navigation.state.params.identityToken)}>
            <AuthNavigator {...props} />
        </ApolloProvider>
    )
}
AuthWrapper.router = AuthNavigator.router

function AppWrapper(props: NavigationScreenProps) {
    return (
        <ApolloProvider
            client={makeClient(props.navigation.state.params.identityToken)}>
            <AppNavigator {...props} />
        </ApolloProvider>
    )
}
AppWrapper.router = AppNavigator.router

const TabNavigatorContainer = createAppContainer(
    createSwitchNavigator(
        {
            AuthLoading: AuthLoadingScreen,
            App: AppWrapper,
            Auth: AuthWrapper
        },
        {
            initialRouteName: "AuthLoading"
        }
    )
)

export function App() {
    return (
        <ThemeProvider
            theme={{
                colors: {
                    primary: "green"
                }
            }}>
            <TabNavigatorContainer />
        </ThemeProvider>
    )
}
