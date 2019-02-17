import React from "react"
import {Icon} from "react-native-elements"
import {NavigationRouteConfigMap} from "react-navigation"
import {Login, Submissions, Submit} from "./pages"

const settings: NavigationRouteConfigMap = {
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
    Login: {
        screen: Login,
        navigationOptions: {
            title: "Login",
            tabBarIcon: <Icon type="font-awesome" name="plus-square" />
        }
    }
}

export default settings
