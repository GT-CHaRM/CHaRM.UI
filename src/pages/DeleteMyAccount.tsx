import React, {useState} from "react"
import {Alert, View} from "react-native"
import {Button, Icon} from "react-native-elements"
import {
    NavigationInjectedProps,
    NavigationRoute,
    NavigationScreenProp
} from "react-navigation"
import {FormInput} from "../components"
import {useDeleteMyAccountMutation} from "../graphql"
import {saveToken} from "../util"

const successfullyDeleted = async (
    navigation: NavigationScreenProp<
        NavigationRoute<DeleteMyAccountNavigationProps>,
        DeleteMyAccountNavigationProps
    >
) => {
    await saveToken("")
    navigation.navigate("Auth") // go back to login/signup pages
}

export interface DeleteMyAccountNavigationProps {}

export const DeleteMyAccount: React.FC<
    NavigationInjectedProps<DeleteMyAccountNavigationProps>
> = ({navigation}) => {
    const [password, setPassword] = useState("")

    const deleteMyAccount = useDeleteMyAccountMutation()

    const submit = async () => {
        const result = await deleteMyAccount({
            variables: {
                Password: password
            }
        })
        if (result.errors) {
            Alert.alert("Error", result.errors.toString())
        } else if (
            result.data &&
            result.data.DeleteMyAccount &&
            result.data.DeleteMyAccount.Id
        ) {
            await successfullyDeleted(navigation)
        }
    }

    return (
        <View>
            <FormInput
                value={password}
                setValue={setPassword}
                secureTextEntry
                placeholder="Password"
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
