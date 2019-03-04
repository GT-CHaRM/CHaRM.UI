import React, {useContext, useEffect} from "react"
import {ActivityIndicator, AsyncStorage, StatusBar, View} from "react-native"
import {Icon} from "react-native-elements"
import {
    createAppContainer,
    createBottomTabNavigator,
    createSwitchNavigator
} from "react-navigation"
import {Login, Profile, Register, Submissions, Submit} from "./pages"
import {TokenContext} from "./TokenContext"

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
    {initialRouteName: "Submit"}
)

class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props)
        this._bootstrapAsync()
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem("Token")

        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        this.props.navigation.navigate(userToken ? "App" : "Auth")
    }

    // Render any loading content that you like here
    render() {
        return (
            <View>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        )
    }
}

const TabNavigatorContainer = createAppContainer(
    createSwitchNavigator(
        {
            AuthLoading: AuthLoadingScreen,
            App: AppNavigator,
            Auth: AuthNavigator
        },
        {initialRouteName: "AuthLoading"}
    )
)

export function MainView() {
    const setToken = useContext(TokenContext)
    useEffect(() => {
        ;(async () => {
            const userToken = await AsyncStorage.getItem("Token")
            if (userToken) {
                setToken(userToken)
            }
        })()
    })
    return <TabNavigatorContainer />
}
