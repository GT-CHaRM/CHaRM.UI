import React, {useState} from "react"
import {ActivityIndicator, KeyboardTypeOptions, Text, View} from "react-native"
import {Button, Image, Input, ListItem} from "react-native-elements"
import {NavigationInjectedProps} from "react-navigation"
import {WithHeader} from "../components"
import {
    MyZipCodeDocument,
    MyZipCodeQuery,
    useChangeMyPasswordMutation,
    useChangeMyZipMutation,
    useMyUsernameQuery,
    useMyZipCodeQuery
} from "../graphql"
import {saveToken} from "../util"

interface ProfileInformationProps {}

const ProfileInformation: React.FC<ProfileInformationProps> = () => {
    const {data} = useMyUsernameQuery()

    if (!data || !data.MyUser) {
        throw ""
    }

    return (
        <View style={{flex: 1}}>
            <Image
                source={{
                    uri:
                        "https://www.topupconsultants.com/wp-content/uploads/2016/06/profile.png"
                }}
                style={{width: 600, height: 400, alignSelf: "center"}}
            />
            <Text style={{fontSize: 18, textAlign: "center"}}>
                You are logged in as {data.MyUser.UserName}
            </Text>
        </View>
    )
}

interface InlineFormProps {
    disable: () => void
    secureTextEntry?: boolean
    placeholder?: string
    keyboardType?: KeyboardTypeOptions
    onSubmit: (value: string) => Promise<void>
}

const InlineTextInput: React.FC<InlineFormProps> = ({
    disable,
    placeholder,
    onSubmit,
    keyboardType,
    secureTextEntry
}) => {
    const [value, setValue] = useState("")

    return (
        <View
            style={{
                flexDirection: "row",
                minHeight: 65
            }}>
            <Button
                type="clear"
                containerStyle={{
                    alignSelf: "center",
                    marginLeft: 0,
                    marginRight: 0
                }}
                title="CANCEL"
                onPress={disable}
            />

            <Input
                containerStyle={{
                    alignSelf: "center",
                    flex: 1
                }}
                inputContainerStyle={{
                    borderBottomWidth: 1,
                    borderWidth: 1,
                    borderColor: "rgba(0, 0, 0, 0.25)"
                }}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                placeholder={placeholder}
                onChangeText={setValue}
            />

            <Button
                type="clear"
                containerStyle={{
                    alignSelf: "center",
                    marginLeft: 0,
                    marginRight: 0
                }}
                title="SUBMIT"
                onPress={async () => {
                    await onSubmit(value)
                    disable()
                }}
            />
        </View>
    )
}

interface ConfigureAccountProps {}
const ConfigureAccount: React.FC<ConfigureAccountProps> = () => {
    const {data, loading} = useMyZipCodeQuery()
    const changePassword = useChangeMyPasswordMutation()
    const changeZipCode = useChangeMyZipMutation()

    const [changingPassword, setChangingPassword] = useState(false)
    const [changingZip, setChangingZip] = useState(false)

    if (loading) {
        return <ActivityIndicator />
    }

    if (!data || !data.MyUser) {
        throw ""
    }

    return (
        <View style={{backgroundColor: "white"}}>
            {changingPassword ? (
                <InlineTextInput
                    placeholder="Password"
                    secureTextEntry
                    onSubmit={async value => {
                        await changePassword({
                            variables: {
                                NewPassword: value
                            }
                        })
                    }}
                    disable={() => setChangingPassword(false)}
                />
            ) : (
                <ListItem
                    containerStyle={{minHeight: 65}}
                    title="Change Password"
                    leftIcon={{name: "av-timer"}}
                    onPress={() => setChangingPassword(true)}
                />
            )}
            {changingZip ? (
                <InlineTextInput
                    placeholder="Zip Code"
                    keyboardType="numeric"
                    disable={() => setChangingZip(false)}
                    onSubmit={async value => {
                        try {
                            await changeZipCode({
                                variables: {ZipCode: value},
                                update: (cache, {data}) => {
                                    if (!data || !data.ChangeMyZipCode) {
                                        return
                                    }
                                    const result = cache.readQuery<
                                        MyZipCodeQuery
                                    >({
                                        query: MyZipCodeDocument
                                    })
                                    if (!result || !result.MyUser) {
                                        return
                                    }
                                    cache.writeQuery<MyZipCodeQuery>({
                                        query: MyZipCodeDocument,
                                        data: {
                                            MyUser: {
                                                ZipCode:
                                                    data.ChangeMyZipCode.ZipCode
                                            }
                                        }
                                    })
                                }
                            })
                        } catch {}
                    }}
                />
            ) : (
                <ListItem
                    containerStyle={{minHeight: 65}}
                    title="Change Zip Code"
                    leftIcon={{name: "av-timer"}}
                    onPress={() => setChangingZip(true)}
                    rightTitle={data.MyUser.ZipCode || ""}
                />
            )}
        </View>
    )
}
interface LogoutButtonProps {}

const LogoutButton: React.FC<
    LogoutButtonProps & NavigationInjectedProps<ProfileNavigationProps>
> = ({navigation}) => {
    return (
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
                    navigation.navigate("AuthLoading")
                }}
            />
        </View>
    )
}

export interface ProfileNavigationProps {}
export const ProfilePage: React.FC<
    NavigationInjectedProps<ProfileNavigationProps>
> = ({navigation}) => {
    return (
        <WithHeader>
            <ProfileInformation />
            <ConfigureAccount />
            <LogoutButton navigation={navigation} />
        </WithHeader>
    )
}
