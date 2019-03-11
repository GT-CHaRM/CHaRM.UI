import React from "react"
import {ActivityIndicator, Text, View} from "react-native"
import {Button, Image} from "react-native-elements"
import {useNavigation} from "react-navigation-hooks"
import {WithHeader} from "../components"
import {useMyUsername} from "../graphql"
import {saveToken} from "../util"

function ProfileInformation() {
    const {navigate} = useNavigation()
    const {data, loading} = useMyUsername()
    if (loading) {
        return <ActivityIndicator />
    }
    const {
        User: {
            Me: {UserName}
        }
    } = data

    return (
        <>
            <View style={{flex: 1}}>
                <Image
                    source={{
                        uri:
                            "https://www.topupconsultants.com/wp-content/uploads/2016/06/profile.png"
                    }}
                    style={{width: 600, height: 400, alignSelf: "center"}}
                />
                <Text style={{fontSize: 18, textAlign: "center"}}>
                    You are logged in as {UserName}
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
                    onPress={async () => {
                        await saveToken("")
                        navigate("AuthLoading")
                    }}
                />
            </View>
        </>
    )
}

export function ProfilePage() {
    return (
        <WithHeader>
            <ProfileInformation />
        </WithHeader>
    )
}
