import React, {useRef, useState} from "react"
import {ActivityIndicator, Alert, ScrollView, View} from "react-native"
import {Button, Icon, Image, Input, Text, Tooltip} from "react-native-elements"
import {
    NavigationInjectedProps,
    NavigationRoute,
    NavigationScreenProp
} from "react-navigation"
import {WithHeader} from "../components"
import {FormInput} from "../components/FormInput"
import {
    useMyUserTypeQuery,
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
    cleanup?: () => void
) => {
    const register = useRegisterMutation({
        fetchPolicy: "no-cache"
    })
    const registerEmployee = useRegisterEmployeeMutation({
        fetchPolicy: "no-cache"
    })

    return async (
        isEmployee: boolean,
        username: string,
        password: string,
        email: string,
        zipCode?: string
    ) => {
        if (!username || !password || !email) {
            Alert.alert("Error", "Fields cannot be empty!")
            return
        }

        if (isEmployee) {
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
            if (cleanup) {
                cleanup()
            }
            Alert.alert("Success", `Successfully registered ${username}`)
        } else {
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
            if (cleanup) {
                cleanup()
            }
            Alert.alert("Success", `Successfully registered ${username}`)
            await saveToken(data.RegisterUser)
            navigation.navigate("AuthLoading")
        }
    }
}

export interface RegisterNavigationProps {
    employee?: boolean
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

    const register = useRegister(navigation, () => {
        setUsername("")
        setPassword("")
        setEmail("")
        setZipCode("")
    })
    const {data, loading} = useMyUserTypeQuery()

    if (loading) {
        return <ActivityIndicator />
    }

    const isEmployee = !!(
        data &&
        data.MyUser &&
        data.MyUser.Type === UserType.Visitor
    )

    const tryRegister = async () =>
        await register(isEmployee, username, password, email, zipCode)

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
                        if (isEmployee) {
                            tryRegister()
                        } else {
                            zipCodeRef.current!.focus()
                        }
                    }}
                />
                {!isEmployee && (
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
        </WithHeader>
    )
}
