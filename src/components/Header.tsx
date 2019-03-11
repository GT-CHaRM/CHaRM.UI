import React from "react"
import {View} from "react-native"
import {Header as RNHeader} from "react-native-elements"
import {useNavigationState} from "react-navigation-hooks"
import {colors} from "../theme"

function resolveTitle(routeName: string) {
    switch (routeName.toLowerCase()) {
        case "submit":
            return "Submit Items"
        case "submissions":
            return "Submission History"
        default:
            return routeName
    }
}

function Header() {
    const {routeName} = useNavigationState()

    return (
        <RNHeader
            backgroundColor={colors.primary}
            centerComponent={{
                text: resolveTitle(routeName).toUpperCase(),
                style: {
                    fontSize: 18,
                    color: "#fff"
                }
            }}
        />
    )
}

export function WithHeader({children}) {
    return (
        <View style={{flex: 1}}>
            <Header />
            {children}
        </View>
    )
}
