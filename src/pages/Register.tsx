import React, {useRef, useState} from "react"
import {Alert, ScrollView, View} from "react-native"
import {Button, Icon, Image, Input, Text, Tooltip} from "react-native-elements"
import {
    NavigationInjectedProps,
    NavigationRoute,
    NavigationScreenProp
} from "react-navigation"
import {FormInput} from "../components/FormInput"
import {
    useRegisterEmployeeMutation,
    useRegisterMutation,
    UserType
} from "../graphql"
import {saveToken} from "../util"

const useRegister = (
    navigation: NavigationScreenProp<
        NavigationRoute<RegisterNavigationProps>,
        RegisterNavigationProps
    >,
    isSelf: boolean,
    userType: UserType,
    cleanup: () => void
) => {
    const register = useRegisterMutation({
        fetchPolicy: "no-cache"
    })
    const registerEmployee = useRegisterEmployeeMutation({
        fetchPolicy: "no-cache"
    })

    return async (
        username: string,
        password: string,
        email: string,
        zipCode?: string
    ) => {
        if (!username || !password || !email) {
            Alert.alert("Error", "Fields cannot be empty!")
            return
        }
        switch (userType) {
            case UserType.Employee: {
                const {data} = await registerEmployee({
                    variables: {
                        Username: username,
                        Password: password,
                        Email: email
                    }
                })
                if (!data || !data.CreateEmployeeAccount) {
                    return
                }
                cleanup()
                Alert.alert("Success", `Successfully registered ${username}`)
                return
            }
            case UserType.Administrator: {
                return
            }
            default: {
                if (!zipCode) {
                    Alert.alert("Error", "Fields cannot be empty!")
                    return
                }
                const {data} = await register({
                    variables: {
                        Username: username,
                        Password: password,
                        Email: email,
                        ZipCode: zipCode
                    }
                })
                if (!data || !data.RegisterUser) {
                    return
                }
                cleanup()
                Alert.alert("Success", `Successfully registered ${username}`)
                if (isSelf) {
                    await saveToken(data.RegisterUser)
                    navigation.navigate("AuthLoading")
                }
            }
        }
    }
}

export interface RegisterNavigationProps {
    targetUserType?: UserType
}

export const Register: React.FC<
    NavigationInjectedProps<RegisterNavigationProps>
> = ({navigation}) => {
    const passwordRef = useRef<Input | null>(null)
    const emailRef = useRef<Input | null>(null)
    const zipCodeRef = useRef<Input | null>(null)

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [zipCode, setZipCode] = useState("")

    const targetUserType = navigation.getParam("targetUserType")
    const isSelf = targetUserType === undefined
    const userType = targetUserType || UserType.Visitor

    const register = useRegister(navigation, isSelf, userType, () => {
        setUsername("")
        setPassword("")
        setEmail("")
        setZipCode("")
    })

    // if (loading) {
    //     return <ActivityIndicator />
    // }

    const tryRegister = async () =>
        await register(username, password, email, zipCode)

    return (
        <View style={{flex: 1}}>
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
                    onSubmitEditing={() => passwordRef.current!.focus()}
                />
                <FormInput
                    inputRef={passwordRef}
                    value={password}
                    setValue={setPassword}
                    secureTextEntry
                    placeholder="Password"
                    iconName="key"
                    onSubmitEditing={() => emailRef.current!.focus()}
                />
                <FormInput
                    inputRef={emailRef}
                    value={email}
                    setValue={setEmail}
                    placeholder="Email"
                    iconName="envelope-o"
                    onSubmitEditing={() => {
                        if (userType === UserType.Visitor) {
                            zipCodeRef.current!.focus()
                        } else {
                            tryRegister()
                        }
                    }}
                />
                {userType === UserType.Visitor && (
                    <View style={{flexDirection: "row"}}>
                        <FormInput
                            inputRef={zipCodeRef}
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
                )}
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
        </View>
    )
}
