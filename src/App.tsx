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
import {ActivityIndicator, Alert, StatusBar, View} from "react-native"
import {Icon, Text, ThemeProvider} from "react-native-elements"
import {
    createAppContainer,
    createBottomTabNavigator,
    createStackNavigator,
    createSwitchNavigator,
    NavigationInjectedProps,
    NavigationScreenProp,
    NavigationScreenProps
} from "react-navigation"
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
import {getToken, tokenExpired} from "./util"

function makeClient(token?: string) {
    return new ApolloClient({
        connectToDevTools: true,
        link: ApolloLink.from([
            onError(({graphQLErrors, networkError}) => {
                if (graphQLErrors)
                    graphQLErrors.map(({message, locations, path}) =>
                        Alert.alert(
                            "GraphQL Error",
                            `Message: ${message}, Location: ${locations}, Path: ${path}`
                        )
                    )
                if (networkError) {
                    Alert.alert("GraphQL Network Error", `${networkError}`)
                }
            }),
            new HttpLink({
                uri: "http://143.215.123.201:5000/graphql",
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

const SubmitNavigator = createStackNavigator({
    Submit: {
        screen: Submit,
        navigationOptions: {
            title: "Submit"
        }
    }
})

const SubmissionsNavigator = createStackNavigator({
    Submissions: {
        screen: Submissions,
        navigationOptions: {
            title: "Submissions"
        }
    },
    EditSubmissions: {
        screen: Submit,
        navigationOptions: {title: "Edit Submission"}
    }
})

const ProfileNavigator = createStackNavigator({
    Profile: {
        screen: Profile,
        navigationOptions: {
            title: "Profile"
        }
    }
})

// FIXME: If start page is Submissions, then manually navigating to the Submit page causes errors
const AppNavigator = createBottomTabNavigator(
    {
        Submit: {
            screen: SubmitNavigator,
            navigationOptions: {
                title: "Submit",
                tabBarIcon: <Icon type="font-awesome" name="cart-plus" />
            }
        },
        Submissions: {
            screen: SubmissionsNavigator,
            navigationOptions: {
                title: "History",
                tabBarIcon: <Icon type="font-awesome" name="list-alt" />
            }
        },
        Profile: {
            screen: ProfileNavigator,
            navigationOptions: {
                title: "Profile",
                tabBarIcon: <Icon type="font-awesome" name="user" />
            }
        },
        "Create Account": {
            screen: Register,
            navigationOptions: {
                title: "Users",
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
        initialRouteName: "Profile"
    }
)

async function clientEffect(navigation: NavigationScreenProp<{}>) {
    // const identityToken = ""
    // await saveToken("")
    const identityToken = await getToken()
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

        if (errors || !data.MyUser) {
            navigation.navigate("Auth", {client})
        } else if (
            data.MyUser.Type === UserType.Employee ||
            data.MyUser.Type === UserType.Administrator
        ) {
            // Alert.alert("Login Success", `Logged in as employee ${data.MyUser.UserName}`)
            navigation.navigate("EmployeeApp", {client})
        } else {
            // Alert.alert("Login Success", `Logged in as visitor ${data.MyUser.UserName}`)
            navigation.navigate("App", {client})
        }
    }
}

function useClientEffect(navigation: NavigationScreenProps["navigation"]) {
    useEffect(() => {
        clientEffect(navigation)
    }, [])
}

export interface AuthLoadingScreenProps {}

export const AuthLoadingScreen: React.FC<
    AuthLoadingScreenProps & NavigationInjectedProps
> = ({navigation}) => {
    useClientEffect(navigation)

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
        <React.Suspense fallback={<Text>Loading...</Text>}>
            <ThemeProvider
                theme={{
                    colors: {
                        primary: "green"
                    }
                }}>
                <TabNavigatorContainer />
            </ThemeProvider>
        </React.Suspense>
    )
}
