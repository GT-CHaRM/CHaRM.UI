import React from "react"
import {createAppContainer, createBottomTabNavigator} from "react-navigation"
import navigationSettings from "./navigation"

const TabNavigator = createBottomTabNavigator(navigationSettings, {
    initialRouteName: "Submit"
})

const TabNavigatorContainer = createAppContainer(TabNavigator)

export function MainView() {
    return <TabNavigatorContainer />
}
