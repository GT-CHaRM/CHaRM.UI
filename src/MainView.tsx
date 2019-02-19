import React from "react"
import {ActivityIndicator, AsyncStorage, StatusBar, View} from "react-native"
import {Icon} from "react-native-elements"
import {
    createAppContainer,
    createBottomTabNavigator,
    createSwitchNavigator
} from "react-navigation"
import {Login, Profile, Register, Submissions, Submit} from "./pages"

const AuthNavigator = createBottomTabNavigator(
    {
        Login: {
            screen: Login,
            navigationOptions: {
                title: "Login",
                tabBarIcon: <Icon type="font-awesome" name="plus-square" />
            }
        },
        Register: {
            screen: Register,
            navigationOptions: {
                title: "Register",
                tabBarIcon: <Icon type="font-awesome" name="plus-square" />
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
                tabBarIcon: <Icon type="font-awesome" name="plus-square" />
            }
        },
        Submissions: {
            screen: Submissions,
            navigationOptions: {
                title: "Submissions",
                tabBarIcon: <Icon type="font-awesome" name="history" />
            }
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                title: "Profile",
                tabBarIcon: <Icon type="font-awesome" name="history" />
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
        {initialRouteName: "Auth"}
    )
)

export function MainView() {
    return <TabNavigatorContainer />
}
