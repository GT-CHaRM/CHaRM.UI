import React, {useContext, useState} from "react"
import {ScrollView, View} from "react-native"
import {Button, Icon, Image} from "react-native-elements"
import {useNavigation} from "react-navigation-hooks"
import {WithHeader} from "../components"
import {FormInput} from "../components/FormInput"
import {useLoginMutation} from "../graphql"
import {TokenContext} from "../TokenContext"

async function loginAsGuest(zipCode: string) {
    // alert(`sup guest ${zipCode}`)
}
export function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [zipCode, setZipCode] = useState("")
    const [guestMode, setGuestMode] = useState(false)
    const {navigate} = useNavigation()
    const login = useLoginMutation()
    const setToken = useContext(TokenContext)

    const tryLogin = async () => {
        if (guestMode) {
            await loginAsGuest(zipCode)
        } else {
            if (!username || !password) {
                alert("Username and password fields cannot be empty!")
                return
            }

            try {
                const {
                    data: {Login: token}
                } = await login({
                    variables: {
                        Username: username,
                        Password: password
                    }
                })
                alert(`Logged in as ${username}`)
                console.log(token)
                setToken(token)
                navigate("Submit")
                // alert(`Your token is ${Login}`)
            } catch {
                alert(
                    "The provivded username and password combination could not be found."
                )
            }
        }
    }
    return (
        <WithHeader>
            <ScrollView>
                <Image
                    style={{
                        alignSelf: "center",
                        width: 300,
                        height: 300
                    }}
                    source={{
                        uri:
                            "https://cdn.discordapp.com/attachments/537654023151681555/547190022911295528/CharmLogo.png"
                    }}
                />

                <View style={{flex: 1}} />

                {guestMode ? (
                    <FormInput
                        value={zipCode}
                        setValue={setZipCode}
                        placeholder="Zip Code"
                        iconName="map-marker"
                    />
                ) : (
                    <View>
                        <FormInput
                            value={username}
                            setValue={setUsername}
                            placeholder="Username"
                            iconName="user"
                        />

                        <FormInput
                            value={password}
                            setValue={setPassword}
                            secureTextEntry
                            placeholder="Password"
                            iconName="key"
                            onSubmitEditing={tryLogin}
                        />
                    </View>
                )}
            </ScrollView>

            <View style={{flex: 1}} />

            <Button
                onPress={() => setGuestMode(!guestMode)}
                title={guestMode ? "Go Back to Login" : "Continue as Guest"}
                containerStyle={{
                    marginTop: 10,
                    marginBottom: 10
                }}
            />
            <Button
                icon={
                    <Icon
                        name="arrow-right"
                        type="font-awesome"
                        size={15}
                        color="white"
                    />
                }
                iconRight
                title="Submit"
                onPress={tryLogin}
            />
        </WithHeader>
    )
}
