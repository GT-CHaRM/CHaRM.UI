import React, {useRef, useState} from "react"
import {Alert, View} from "react-native"
import {Button, Icon, Input} from "react-native-elements"
import {
    NavigationInjectedProps,
    NavigationRoute,
    NavigationScreenProp
} from "react-navigation"
import {FormInput} from "../components"
import {useChangeMyPasswordMutation} from "../graphql"
import {saveToken} from "../util"

const successfullyDeleted = async (
    navigation: NavigationScreenProp<
        NavigationRoute<ChangeMyPasswordNavigationProps>,
        ChangeMyPasswordNavigationProps
    >
) => {
    await saveToken("")
    navigation.navigate("Auth") // go back to login/signup pages
}

export interface ChangeMyPasswordNavigationProps {}

export const ChangeMyPassword: React.FC<
    NavigationInjectedProps<ChangeMyPasswordNavigationProps>
> = ({navigation}) => {
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [oldPassword, setOldPassword] = useState("")

    const changeMyPassword = useChangeMyPasswordMutation()

    const submit = async () => {
        if (password !== passwordConfirm) {
            Alert.alert(
                "Error",
                "Your password and password confirmation do not match!"
            )
            return
        }

        const result = await changeMyPassword({
            variables: {
                OldPassword: oldPassword,
                NewPassword: password
            }
        })
        if (result.errors) {
            Alert.alert("Error", result.errors.toString())
        } else if (
            result.data &&
            result.data.ChangeMyPassword &&
            result.data.ChangeMyPassword.Id
        ) {
            await successfullyDeleted(navigation)
        }
    }

    const passwordRef = useRef<Input>(null)
    const passwordConfirmRef = useRef<Input>(null)
    return (
        <View>
            <FormInput
                value={oldPassword}
                setValue={setOldPassword}
                secureTextEntry
                placeholder="Old Password"
                iconName="key"
                onSubmitEditing={() => passwordRef.current!.focus()}
            />
            <FormInput
                inputRef={passwordRef}
                value={password}
                setValue={setPassword}
                secureTextEntry
                placeholder="New Password"
                iconName="key"
                onSubmitEditing={() => passwordConfirmRef.current!.focus()}
            />
            <FormInput
                inputRef={passwordConfirmRef}
                value={passwordConfirm}
                setValue={setPasswordConfirm}
                secureTextEntry
                placeholder="Confirm New Password"
                iconName="key"
                onSubmitEditing={submit}
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
                onPress={submit}
                title="Submit"
            />
        </View>
    )
}
