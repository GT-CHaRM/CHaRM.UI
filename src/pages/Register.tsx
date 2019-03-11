import React, {useState} from "react"
import {ScrollView, View} from "react-native"
import {Button, Icon, Image, Text, Tooltip} from "react-native-elements"
import {useNavigation} from "react-navigation-hooks"
import {WithHeader} from "../components"
import {FormInput} from "../components/FormInput"
import {useRegister} from "../graphql"
import {saveToken} from "../util"

export function Register() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [zipCode, setZipCode] = useState("")
    const {navigate} = useNavigation()
    const register = useRegister()

    const tryRegister = async () => {
        if (!username || !password || !email || !zipCode) {
            alert("Fields cannot be empty!")
            return
        }

        const {
            data: {
                User: {Register: token}
            }
        } = await register({
            variables: {
                Username: username,
                Password: password,
                Email: email
            }
        })
        alert(`Successfully registered ${username}`)
        await saveToken(token)
        navigate("AuthLoading")
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
                <View style={{flexDirection: "row"}}>
                    <FormInput
                        style={{flex: 1}}
                        value={zipCode}
                        setValue={setZipCode}
                        keyboardType="numbers-and-punctuation"
                        placeholder="Zip Code"
                        iconName="map-marker"
                        onSubmitEditing={tryRegister}
                    />
                    <Tooltip
                        popover={
                            <Text style={{color: "white"}}>
                                We collect your zip code in order to request
                                grant money from the government.
                            </Text>
                        }
                        width={250}
                        height={80}>
                        <Icon
                            name="question-circle"
                            type="font-awesome"
                            size={35}
                            containerStyle={{
                                marginRight: 10,
                                marginLeft: 5
                            }}
                        />
                    </Tooltip>
                </View>
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
