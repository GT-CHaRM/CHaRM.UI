import React, {useRef, useState} from "react"
import {Alert, View} from "react-native"
import {Button, Icon, Image, Input} from "react-native-elements"
import {ScrollView} from "react-native-gesture-handler"
import {
    NavigationInjectedProps,
    NavigationRoute,
    NavigationScreenProp
} from "react-navigation"
import {WithHeader} from "../components"
import {FormInput} from "../components/FormInput"
import {useLoginMutation} from "../graphql"
import {saveToken} from "../util"

export interface LoginNavigationProps {}

const useLogin = (
    navigation: NavigationScreenProp<
        NavigationRoute<LoginNavigationProps>,
        LoginNavigationProps
    >
) => {
    const login = useLoginMutation({
        fetchPolicy: "no-cache"
    })

    return async (guestMode: boolean, username?: string, password?: string) => {
        if (guestMode) {
            await saveToken("")
            navigation.navigate("Submit")
        } else {
            if (!username || !password) {
                Alert.alert(
                    "Error",
                    "Username and password fields cannot be empty!"
                )
                return
            }

            try {
                const {data} = await login({
                    variables: {
                        Username: username,
                        Password: password
                    }
                })
                if (!data || !data.LoginUser) {
                    await saveToken("")
                    return
                }
                await saveToken(data.LoginUser)
                navigation.navigate("AuthLoading")
                // Alert.alert(`Your token is ${Login}`)
            } catch {
                Alert.alert(
                    "Error",
                    "The provivded username and password combination could not be found."
                )
            }
        }
    }
}

export const LoginAsGuest: React.FC<
    NavigationInjectedProps<LoginNavigationProps>
> = ({navigation}) => {
    const [zipCode, setZipCode] = useState("")

    const tryLogin = useLogin(navigation)

    return (
        <FormInput
            value={zipCode}
            setValue={setZipCode}
            keyboardType="numbers-and-punctuation"
            placeholder="Zip Code"
            iconName="map-marker"
            onSubmitEditing={() => tryLogin(true)}
        />
    )
}
export const LoginAsVisitor: React.FC<
    NavigationInjectedProps<LoginNavigationProps>
> = ({navigation}) => {
    const passwordRef = useRef<Input | null>(null)

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const tryLogin = useLogin(navigation)

    return (
        <View>
            <FormInput
                value={username}
                setValue={setUsername}
                placeholder="Username"
                iconName="user"
                onSubmitEditing={() => passwordRef.current!.focus()}
            />

            <FormInput
                value={password}
                setValue={setPassword}
                secureTextEntry
                placeholder="Password"
                iconName="key"
                onSubmitEditing={() => tryLogin(false, username, password)}
            />
        </View>
    )
}

export const Login: React.FC<NavigationInjectedProps<LoginNavigationProps>> = ({
    ...props
}) => {
    const [guestMode, setGuestMode] = useState(false)

    return (
        <WithHeader>
            <View style={{flex: 1}} />
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

                <Button
                    onPress={() => setGuestMode(!guestMode)}
                    title={guestMode ? "Go Back to Login" : "Continue as Guest"}
                    containerStyle={{
                        marginTop: 10,
                        marginBottom: 10
                    }}
                />

                {guestMode ? (
                    <LoginAsGuest {...props} />
                ) : (
                    <LoginAsVisitor {...props} />
                )}
            </ScrollView>
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
                onPress={() => {}}
            />
        </WithHeader>
    )
}
