import React, {useContext, useState} from "react"
import {
    ActivityIndicator,
    Alert,
    KeyboardTypeOptions,
    Text,
    View
} from "react-native"
import {Button, Image, Input, ListItem} from "react-native-elements"
import {
    NavigationInjectedProps,
    NavigationRoute,
    NavigationScreenProp
} from "react-navigation"
import {
    MyZipCodeDocument,
    MyZipCodeQuery,
    useChangeMyZipMutation,
    useMyUsernameQuery,
    useMyUserTypeQuery,
    useMyZipCodeQuery,
    UserType
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
                style={{width: 480, height: 320, alignSelf: "center"}}
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

export interface ChangeMyZipConfigureComponentProps {}

export const ChangeMyZipConfigureComponent: React.FC<
    ChangeMyZipConfigureComponentProps
> = ({}) => {
    const {data, loading} = useMyZipCodeQuery()
    const changeZipCode = useChangeMyZipMutation({
        update: (cache, {data}) => {
            if (!data || !data.ChangeMyZipCode) {
                return
            }
            try {
                const result = cache.readQuery<MyZipCodeQuery>({
                    query: MyZipCodeDocument
                })
                if (!result || !result.MyUser) {
                    return
                }
                cache.writeQuery<MyZipCodeQuery>({
                    query: MyZipCodeDocument,
                    data: {
                        MyUser: {
                            __typename: "User",
                            ZipCode: data.ChangeMyZipCode.ZipCode
                        }
                    }
                })
            } catch {}
        }
    })

    const [changingZip, setChangingZip] = useState(false)

    if (loading) {
        return <ActivityIndicator />
    }

    if (!data || !data.MyUser) {
        throw ""
    }

    return (
        <>
            {changingZip ? (
                <InlineTextInput
                    placeholder="Zip Code"
                    keyboardType="numeric"
                    disable={() => setChangingZip(false)}
                    onSubmit={async value => {
                        try {
                            await changeZipCode({
                                variables: {ZipCode: value}
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
        </>
    )
}

interface ConfigureAccountProps {}
const ConfigureAccount: React.FC<ConfigureAccountProps> = () => {
    const myTypeResult = useMyUserTypeQuery()
    const navigation = useNavigation()

    return (
        <View style={{backgroundColor: "white"}}>
            <ListItem
                containerStyle={{minHeight: 65}}
                title="Change Password"
                leftIcon={{name: "av-timer"}}
                onPress={() => navigation.navigate("ChangePassword")}
            />
            {(!myTypeResult.data ||
                !myTypeResult.data.MyUser ||
                myTypeResult.data.MyUser.Type === UserType.Visitor) && (
                <ChangeMyZipConfigureComponent />
            )}
            {(!myTypeResult.data ||
                !myTypeResult.data.MyUser ||
                myTypeResult.data.MyUser.Type !== UserType.Administrator) && (
                <ListItem
                    containerStyle={{minHeight: 65}}
                    title="Delete My Account"
                    leftIcon={{name: "av-timer"}}
                    onPress={() => navigation.navigate("DeleteMyAccount")}
                />
            )}
        </View>
    )
}
interface LogoutButtonProps {}

const LogoutButton: React.FC<LogoutButtonProps> = () => {
    const navigation = useNavigation()
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
                onPress={() => {
                    Alert.alert(
                        "Confirm Log Out",
                        "Are you sure you want to log out?",
                        [
                            {text: "No"},
                            {
                                text: "Yes",
                                onPress: async () => {
                                    await saveToken("")
                                    navigation.navigate("AuthLoading")
                                }
                            }
                        ]
                    )
                }}
            />
        </View>
    )
}

const NavigationContext = React.createContext<
    | NavigationScreenProp<
          NavigationRoute<ProfileNavigationProps>,
          ProfileNavigationProps
      >
    | undefined
>(undefined)
const useNavigation = () => {
    const ctx = useContext(NavigationContext)
    if (ctx === undefined) {
        throw new Error("Make sure you register the proper provider!")
    }
    return ctx
}

export interface ProfileNavigationProps {}
export const ProfilePage: React.FC<
    NavigationInjectedProps<ProfileNavigationProps>
> = ({navigation}) => {
    return (
        <NavigationContext.Provider value={navigation}>
            <ProfileInformation />
            <ConfigureAccount />
            <LogoutButton />
        </NavigationContext.Provider>
    )
}
