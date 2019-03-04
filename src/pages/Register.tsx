import React, {useContext, useState} from "react"
import {ScrollView, View} from "react-native"
import {Button, Icon, Image} from "react-native-elements"
import {useNavigation} from "react-navigation-hooks"
import {WithHeader} from "../components"
import {FormInput} from "../components/FormInput"
import {useRegisterMutation} from "../graphql"
import {TokenContext} from "../TokenContext"

export function Register() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [zipCode, setZipCode] = useState("")
    const {navigate} = useNavigation()
    const register = useRegisterMutation()
    const setToken = useContext(TokenContext)

    const tryRegister = async () => {
        if (!username || !password || !email || !zipCode) {
            alert("Fields cannot be empty!")
            return
        }

        const {
            data: {Register: token}
        } = await register({
            variables: {
                Username: username,
                Password: password,
                Email: email
            }
        })
        alert(`Successfully registered ${username}`)
        setToken(token)
        navigate("Submit")
    }
    return (
        <WithHeader>
            <ScrollView>
                <Image
                    style={{
                        alignSelf: "center",
                        width: 250,
                        height: 250
                    }}
                    source={{
                        uri:
                            "https://cdn.discordapp.com/attachments/537654023151681555/547190022911295528/CharmLogo.png"
                    }}
                />
                <View style={{flex: 1}} />
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
                />
                <FormInput
                    value={email}
                    setValue={setEmail}
                    placeholder="Email"
                    iconName="envelope-o"
                />
                <FormInput
                    value={zipCode}
                    setValue={setZipCode}
                    keyboardType="numbers-and-punctuation"
                    placeholder="Zip Code"
                    iconName="map-marker"
                    onSubmitEditing={tryRegister}
                />
            </ScrollView>
            <View style={{flex: 1}} />
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
                onPress={tryRegister}
                title="Submit"
            />
        </WithHeader>
    )
}
