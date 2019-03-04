import React, {useContext} from "react"
import {Text, View} from "react-native"
import {Button, Image} from "react-native-elements"
import {useNavigation} from "react-navigation-hooks"
import {WithHeader} from "../components"
import {TokenContext} from "../TokenContext"

export function Profile() {
    const setToken = useContext(TokenContext)
    const {navigate} = useNavigation()

    return (
        <WithHeader>
            <View style={{flex: 1}}>
                <Image
                    source={{
                        uri:
                            "https://www.topupconsultants.com/wp-content/uploads/2016/06/profile.png"
                    }}
                    style={{width: 600, height: 400, alignSelf: "center"}}
                />
                <Text style={{fontSize: 18, textAlign: "center"}}>
                    You are logged in as Chris
                </Text>
            </View>

            <View
                style={{
                    flexDirection: "column"
                }}>
                <Button
                    containerStyle={{
                        marginLeft: 0,
                        marginRight: 0
                    }}
                    title="LOG OUT"
                    onPress={() => {
                        setToken("")
                        navigate("Login")
                    }}
                />
            </View>
        </WithHeader>
    )
}
