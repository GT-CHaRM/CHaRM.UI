import React from "react"
import {View} from "react-native"
import {Header as RNHeader, HeaderSubComponent} from "react-native-elements"
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

interface HeaderProps {
    right?: HeaderSubComponent
}

const Header: React.FC<HeaderProps> = ({right}) => {
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
            rightComponent={right}
        />
    )
}

export interface WithHeaderProps {
    right?: HeaderSubComponent
}

export const WithHeader: React.FC<WithHeaderProps> = ({children, right}) => {
    return (
        <View style={{flex: 1}}>
            <Header right={right} />
            {children}
        </View>
    )
}
