import {
    InMemoryCache,
    IntrospectionFragmentMatcher
} from "apollo-cache-inmemory"
import {ApolloClient, ApolloQueryResult} from "apollo-client"
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
    NavigationScreenProp,
    NavigationScreenProps
} from "react-navigation"
import {useNavigation} from "react-navigation-hooks"
import introspectionQueryResultData, {
    MyInformationDocument,
    MyInformationQuery,
    UserType
} from "./graphql"
import {
    EmployeeSubmissions,
    Login,
    ProfilePage as Profile,
    Register,
    Submissions,
    Submit
} from "./pages"
import {resolvers} from "./resolvers"
import {tokenExpired} from "./util"

function makeClient(token?: string) {
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

const EmployeeAppNavigator = createBottomTabNavigator(
    {
        Submissions: {
            screen: EmployeeSubmissions,
            navigationOptions: {
                title: "History",
                tabBarIcon: <Icon type="font-awesome" name="list-alt" />
            }
        },
        Submit: {
            screen: Submit,
            navigationOptions: {
                title: "Submit",
                tabBarIcon: <Icon type="font-awesome" name="cart-plus" />
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
        initialRouteName: "Submissions"
    }
)

async function clientEffect(navigation: NavigationScreenProp<{}>) {
    // const identityToken = ""
    const identityToken = await AsyncStorage.getItem("Token")
    console.log({identityToken})

    if (!identityToken || tokenExpired(identityToken)) {
        navigation.navigate("Auth", {client: makeClient()})
    } else {
        const client = makeClient(identityToken)
        const {
            data,
            errors
        }: ApolloQueryResult<MyInformationQuery> = await client.query({
            query: MyInformationDocument,
            fetchPolicy: "network-only"
        })

        // TODO: Wait for loading to finish?

        if (errors || !data.User.Me) {
            navigation.navigate("Auth", {client})
        } else if (
            data.User.Me.Type === UserType.Employee ||
            data.User.Me.Type === UserType.Administrator
        ) {
            alert(`Logged in as employee ${data.User.Me.UserName}`)
            navigation.navigate("EmployeeApp", {client})
        } else {
            alert(`Logged in as visitor ${data.User.Me.UserName}`)
            navigation.navigate("App", {client})
        }
    }
}

function useClientEffect() {
    const navigation = useNavigation()

    useEffect(() => {
        clientEffect(navigation)
    })
}

function AuthLoadingScreen() {
    useClientEffect()

    return (
        <View>
            <ActivityIndicator />
            <StatusBar barStyle="default" />
        </View>
    )
}

function AuthWrapper(props: NavigationScreenProps) {
    return (
        <ApolloProvider client={props.navigation.state.params.client}>
            <AuthNavigator {...props} />
        </ApolloProvider>
    )
}
AuthWrapper.router = AuthNavigator.router

function AppWrapper(props: NavigationScreenProps) {
    return (
        <ApolloProvider client={props.navigation.state.params.client}>
            <AppNavigator {...props} />
        </ApolloProvider>
    )
}
AppWrapper.router = AppNavigator.router

function EmployeeAppWrapper(props: NavigationScreenProps) {
    return (
        <ApolloProvider client={props.navigation.state.params.client}>
            <EmployeeAppNavigator {...props} />
        </ApolloProvider>
    )
}
EmployeeAppWrapper.router = EmployeeAppNavigator.router

const TabNavigatorContainer = createAppContainer(
    createSwitchNavigator(
        {
            AuthLoading: AuthLoadingScreen,
            App: AppWrapper,
            EmployeeApp: EmployeeAppWrapper,
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
