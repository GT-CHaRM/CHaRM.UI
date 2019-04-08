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
    createMaterialTopTabNavigator,
    createStackNavigator as createStackNavigatorImported,
    createSwitchNavigator,
    NavigationContainer,
    NavigationInjectedProps,
    NavigationRoute,
    NavigationRouteConfigMap,
    NavigationScreenProp,
    NavigationScreenProps,
    StackNavigatorConfig
} from "react-navigation"
import introspectionQueryResultData, {
    MyInformationDocument,
    MyInformationQuery,
    UserType
} from "./graphql"
import {
    ChangeMyPassword,
    ChangeUserPassword,
    ChangeUserZipCode,
    DeleteMyAccount,
    Login,
    ProfilePage as Profile,
    Register,
    SingleUserActions,
    Submissions,
    Submit,
    UserList
} from "./pages"
import {resolvers} from "./resolvers"
import {colors} from "./theme"
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
                uri: "http://155.138.160.132:5000/graphql",
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

function createStackNavigator(
    routeConfigMap: NavigationRouteConfigMap,
    stackConfig?: StackNavigatorConfig | undefined
): NavigationContainer {
    return createStackNavigatorImported(routeConfigMap, {
        ...(stackConfig || {}),
        headerLayoutPreset: "center",
        defaultNavigationOptions: {
            headerStyle: {backgroundColor: "green"},
            headerTintColor: "white"
        }
    })
}

const AuthNavigator = createBottomTabNavigator(
    {
        Login: {
            screen: Login,
            navigationOptions: {
                title: "Login",
                tabBarIcon: ({focused}) => (
                    <Icon
                        iconStyle={{color: focused ? "white" : "black"}}
                        type="font-awesome"
                        name="sign-in"
                    />
                )
            }
        },
        Register: {
            screen: Register,
            navigationOptions: {
                title: "Register",
                tabBarIcon: ({focused}) => (
                    <Icon
                        iconStyle={{color: focused ? "white" : "black"}}
                        type="font-awesome"
                        name="user-plus"
                    />
                )
            }
        }
    },
    {
        initialRouteName: "Login",
        tabBarOptions: {
            activeTintColor: "white",
            activeBackgroundColor: "rgba(0, 128, 0, .45)"
        }
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

const ProfileNavigator = createStackNavigator(
    {
        Profile: {
            screen: Profile,
            navigationOptions: {
                title: "Profile"
            }
        },
        ChangePassword: {
            screen: ChangeMyPassword,
            navigationOptions: {
                title: "Change Password"
            }
        },
        DeleteMyAccount: {
            screen: DeleteMyAccount,
            navigationOptions: {
                title: "Delete My Account"
            }
        }
    },
    {
        mode: "modal"
    }
)

const UserListNavigator = (activeUserType: UserType) =>
    createStackNavigator({
        UserList: {
            screen: UserList,
            navigationOptions: ({
                navigation
            }: {
                navigation: NavigationScreenProp<NavigationRoute>
            }) => {
                navigation.state.params = {activeUserType}

                return {
                    title: "User List"
                }
            }
        },
        SingleUserActions: {
            screen: SingleUserActions,
            navigationOptions: ({
                navigation
            }: {
                navigation: NavigationScreenProp<NavigationRoute>
            }) => {
                return {
                    title: `Modify ${navigation.getParam("type") ||
                        UserType.Visitor}: ${navigation.getParam("name")}`
                }
            }
        },
        ViewSubmissions: {
            screen: Submissions,
            navigationOptions: ({
                navigation
            }: {
                navigation: NavigationScreenProp<NavigationRoute>
            }) => {
                return {
                    title: `Submission Log: ${navigation.getParam("name")}`
                }
            }
        },
        EditSubmissions: {
            screen: Submit,
            navigationOptions: {title: "Edit Submission"}
        },
        ChangeUserZipCode: {
            screen: ChangeUserZipCode,
            navigationOptions: {
                title: "Change User Zip Code"
            }
        },
        ChangeUserPassword: {
            screen: ChangeUserPassword,
            navigationOptions: {
                title: "Change Password"
            }
        }
    })

const RegisterAccountEmployeeNavigator = createStackNavigator({
    CreateAccount: {
        screen: Register,
        navigationOptions: ({
            navigation
        }: {
            navigation: NavigationScreenProp<NavigationRoute>
        }) => {
            navigation.state.params = {targetUserType: UserType.Visitor}
            return {
                title: "Register Visitor Account",
                tabBarIcon: ({focused}) => (
                    <Icon
                        iconStyle={{color: focused ? "white" : "black"}}
                        type="font-awesome"
                        name="user"
                    />
                )
            }
        }
    }
})

const RegisterAccountAdminNavigator = createStackNavigator({
    CreateAccount: {
        screen: Register,
        navigationOptions: ({
            navigation
        }: {
            navigation: NavigationScreenProp<NavigationRoute>
        }) => {
            navigation.state.params = {targetUserType: UserType.Employee} //TODO: hacky; fix
            return {
                title: "Register Employee Account",
                tabBarIcon: ({focused}) => (
                    <Icon
                        iconStyle={{color: focused ? "white" : "black"}}
                        type="font-awesome"
                        name="user"
                    />
                )
            }
        }
    }
})

const UserEmployeeNavigator = createMaterialTopTabNavigator(
    {
        UserList: {
            screen: UserListNavigator(UserType.Employee),
            navigationOptions: {
                title: "User List"
            }
        },
        CreateAccount: {
            screen: RegisterAccountEmployeeNavigator,
            navigationOptions: {
                title: "Register New Visitor"
            }
        }
    },
    {
        tabBarOptions: {
            style: {backgroundColor: colors.primary}
        }
    }
)

const UserAdminNavigator = createMaterialTopTabNavigator(
    {
        UserList: {
            screen: UserListNavigator(UserType.Administrator),
            navigationOptions: {
                title: "User List"
            }
        },
        CreateAccount: {
            screen: RegisterAccountAdminNavigator,
            navigationOptions: {
                title: "Register New Employee"
            }
        }
    },
    {
        tabBarOptions: {
            style: {backgroundColor: colors.primary}
        }
    }
)

// FIXME: If start page is Submissions, then manually navigating to the Submit page causes errors
const AppNavigator = createBottomTabNavigator(
    {
        Submit: {
            screen: SubmitNavigator,
            navigationOptions: {
                title: "Submit",
                tabBarIcon: ({focused}) => (
                    <Icon
                        iconStyle={{color: focused ? "white" : "black"}}
                        type="font-awesome"
                        name="cart-plus"
                    />
                )
            }
        },
        Submissions: {
            screen: SubmissionsNavigator,
            navigationOptions: {
                title: "History",
                tabBarIcon: ({focused}) => (
                    <Icon
                        iconStyle={{color: focused ? "white" : "black"}}
                        type="font-awesome"
                        name="list-alt"
                    />
                )
            }
        },
        Profile: {
            screen: ProfileNavigator,
            navigationOptions: {
                title: "Profile",
                tabBarIcon: ({focused}) => (
                    <Icon
                        iconStyle={{color: focused ? "white" : "black"}}
                        type="font-awesome"
                        name="user"
                    />
                )
            }
        }
    },
    {
        initialRouteName: "Submit",
        tabBarOptions: {
            activeTintColor: "white",
            activeBackgroundColor: "rgba(0, 128, 0, .45)"
        }
    }
)

const EmployeeAppNavigator = createBottomTabNavigator(
    {
        User: {
            screen: UserEmployeeNavigator,
            navigationOptions: {
                title: "User Management",
                tabBarIcon: ({focused}) => (
                    <Icon
                        iconStyle={{color: focused ? "white" : "black"}}
                        type="font-awesome"
                        name="server"
                    />
                )
            }
        },
        Profile: {
            screen: ProfileNavigator,
            navigationOptions: {
                title: "Profile",
                tabBarIcon: ({focused}) => (
                    <Icon
                        iconStyle={{color: focused ? "white" : "black"}}
                        type="font-awesome"
                        name="user"
                    />
                )
            }
        }
    },
    {
        initialRouteName: "User",
        tabBarOptions: {
            activeTintColor: "white",
            activeBackgroundColor: "rgba(0, 128, 0, .45)"
        }
    }
)

const AdminAppNavigator = createBottomTabNavigator(
    {
        User: {
            screen: UserAdminNavigator,
            navigationOptions: {
                title: "User Management",
                tabBarIcon: ({focused}) => (
                    <Icon
                        iconStyle={{color: focused ? "white" : "black"}}
                        type="font-awesome"
                        name="server"
                    />
                )
            }
        },
        Profile: {
            screen: ProfileNavigator,
            navigationOptions: {
                title: "Profile",
                tabBarIcon: ({focused}) => (
                    <Icon
                        iconStyle={{color: focused ? "white" : "black"}}
                        type="font-awesome"
                        name="user"
                    />
                )
            }
        }
    },
    {
        initialRouteName: "User",
        tabBarOptions: {
            activeTintColor: "white",
            activeBackgroundColor: "rgba(0, 128, 0, .45)"
        }
    }
)

async function clientEffect(navigation: NavigationScreenProp<{}>) {
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
        } else if (data.MyUser.Type === UserType.Administrator) {
            // Alert.alert(
            //     "Login Success",
            //     `Logged in as administrator ${data.MyUser.UserName}`
            // )
            navigation.navigate("AdminApp", {client})
        } else if (data.MyUser.Type === UserType.Employee) {
            // Alert.alert(
            //     "Login Success",
            //     `Logged in as employee ${data.MyUser.UserName}`
            // )
            navigation.navigate("EmployeeApp", {client})
        } else {
            // Alert.alert(
            //     "Login Success",
            //     `Logged in as visitor ${data.MyUser.UserName}`
            // )
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
        <ApolloProvider
            client={
                (props.navigation.state.params || {client: undefined}).client
            }>
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

function AdminAppWrapper(props: NavigationScreenProps) {
    return (
        <ApolloProvider client={props.navigation.state.params.client}>
            <AdminAppNavigator {...props} />
        </ApolloProvider>
    )
}
AdminAppWrapper.router = AdminAppNavigator.router

const TabNavigatorContainer = createAppContainer(
    createSwitchNavigator(
        {
            AuthLoading: AuthLoadingScreen,
            App: AppWrapper,
            EmployeeApp: EmployeeAppWrapper,
            AdminApp: AdminAppWrapper,
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
