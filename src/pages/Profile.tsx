import React, {useContext} from "react"
import {Text} from "react-native"
import {Button} from "react-native-elements"
import {useNavigation} from "react-navigation-hooks"
import {WithHeader} from "../components"
import {TokenContext} from "../TokenContext"

export function Profile() {
    const setToken = useContext(TokenContext)
    const {navigate} = useNavigation()
    // const {
    //     data: {
    //         Me: {UserName}
    //     }
    // } = useMyUsername()

    return (
        <WithHeader>
            <Text>You are logged in as Dalton</Text>
            <Button
                title="LOG OUT"
                onPress={() => {
                    setToken("")
                    navigate("Login")
                }}
            />
        </WithHeader>
    )
}
