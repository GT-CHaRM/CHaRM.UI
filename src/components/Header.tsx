import React from "react"
import {View} from "react-native"
import {Header as RNHeader} from "react-native-elements"
import {useNavigationState} from "react-navigation-hooks"
import {colors} from "../theme"

function Header() {
    const {routeName} = useNavigationState()

    return (
        <RNHeader
            backgroundColor={colors.primary}
            centerComponent={{
                text: routeName.toUpperCase(),
                style: {
                    fontSize: 20,
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
