import React, {useEffect, useState} from "react"
import {Alert, FlatList, View} from "react-native"
import {
    Button,
    ButtonGroup,
    Icon,
    Input,
    ListItem,
    Text
} from "react-native-elements"
import {
    NavigationInjectedProps,
    NavigationRoute,
    NavigationScreenProp
} from "react-navigation"
import {
    GetAllUsersDocument,
    GetAllUsersQuery,
    Scalars,
    useChangeUserPasswordMutation,
    useChangeUserZipCodeMutation,
    useDeleteUserMutation,
    useGetAllUsersQuery,
    UserType,
    UserZipCodeDocument,
    UserZipCodeQuery,
    UserZipCodeQueryVariables,
    useUserZipCodeQuery
} from "../graphql"

export interface ChangeUserPasswordNavigationProps {
    id: Scalars["ID"]
}

export const ChangeUserPassword: React.FC<
    NavigationInjectedProps<ChangeUserPasswordNavigationProps>
> = ({navigation}) => {
    const [id] = [navigation.getParam("id")]

    const [password, setPassword] = useState("")

    const changePassword = useChangeUserPasswordMutation()

    return (
        <View style={{flex: 1}}>
            <Input
                placeholder="Password"
                label="Password"
                value={password}
                onChangeText={setPassword}
            />
            <View style={{flex: 1}} />
            <Button
                title="Submit"
                onPress={() =>
                    changePassword({variables: {Id: id, NewPassword: password}})
                }
            />
        </View>
    )
}

const useChangeZipCode = () =>
    useChangeUserZipCodeMutation({
        update: (cache, {data}) => {
            if (!data || !data.ChangeUserZipCode) {
                return
            }
            cache.writeQuery<UserZipCodeQuery, UserZipCodeQueryVariables>({
                query: UserZipCodeDocument,
                variables: {Id: data.ChangeUserZipCode.Id},
                data: {
                    User: {
                        __typename: "User",
                        ZipCode: data.ChangeUserZipCode.ZipCode
                    }
                }
            })
        }
    })

export interface ChangeUserZipCodeNavigationProps {
    id: Scalars["ID"]
    previousZipCode?: string
}

export const ChangeUserZipCode: React.FC<
    NavigationInjectedProps<ChangeUserZipCodeNavigationProps>
> = ({navigation}) => {
    const [id] = [navigation.getParam("id")]

    const [zipCode, setZipCode] = useState("")

    const result = useUserZipCodeQuery({variables: {Id: id}})
    if (result.errors || !result.data || !result.data.User) {
        throw `Could not find user ${id}; Data: ${result.data}; Errors: ${
            result.errors
        }`
    }
    useEffect(() => {
        if (!result.data || !result.data.User) {
            return
        }
        setZipCode(result.data.User.ZipCode)
    }, [result.data.User.ZipCode])
    const changeZipCode = useChangeZipCode()

    return (
        <View style={{flex: 1}}>
            <Input
                placeholder="Zip Code"
                label="Zip Code"
                value={zipCode}
                onChangeText={setZipCode}
            />
            <View style={{flex: 1}} />
            <Button
                title="Submit"
                onPress={() =>
                    changeZipCode({variables: {Id: id, ZipCode: zipCode}})
                }
            />
        </View>
    )
}

const useDeleteUser = () =>
    useDeleteUserMutation({
        update: (cache, {data}) => {
            if (!data || !data.DeleteAccount) {
                return
            }
            try {
                const result = cache.readQuery<GetAllUsersQuery>({
                    query: GetAllUsersDocument
                })
                if (!result || !result.AllUsers) {
                    return
                }
                cache.writeQuery<GetAllUsersQuery>({
                    query: GetAllUsersDocument,
                    data: {
                        AllUsers: result.AllUsers.filter(
                            user => user.Id !== data.DeleteAccount!.Id
                        )
                    }
                })
            } catch {}
        }
    })

export interface SingleUserActionsNavigationProps {
    id: Scalars["ID"]
    name: string
    type?: UserType
}

export const SingleUserActions: React.FC<
    NavigationInjectedProps<SingleUserActionsNavigationProps>
> = ({navigation}) => {
    const [id, name, type] = [
        navigation.getParam("id"),
        navigation.getParam("name"),
        navigation.getParam("type") || UserType.Visitor
    ]

    const deleteUser = useDeleteUser()

    return (
        <View style={{flex: 1}}>
            {type === UserType.Visitor && (
                <ListItem
                    title="Submission Log"
                    onPress={() =>
                        navigation.navigate("ViewSubmissions", {
                            userId: id,
                            name
                        })
                    }
                />
            )}

            {type === UserType.Visitor && (
                <ListItem
                    title="Change Zip Code"
                    onPress={() =>
                        navigation.navigate("ChangeUserZipCode", {
                            id
                        })
                    }
                />
            )}
            <ListItem
                title="Change Password"
                onPress={() =>
                    navigation.navigate("ChangeUserPassword", {
                        id
                    })
                }
            />
            <ListItem
                title="Delete User"
                onPress={() =>
                    Alert.alert(
                        "Confirm Deletion",
                        `Are you sure you want to delete ${name}?`,
                        [
                            {
                                text: "No"
                            },
                            {
                                text: "Yes",
                                onPress: async () => {
                                    await deleteUser({
                                        variables: {
                                            Id: id
                                        }
                                    })
                                    Alert.alert(
                                        "Success",
                                        `Successfully deleted ${name}`
                                    )
                                    navigation.pop()
                                }
                            }
                        ]
                    )
                }
            />
        </View>
    )
}

export interface UserListEntryProps {
    id: Scalars["ID"]
    name: string
    type?: UserType
    navigation: NavigationScreenProp<
        NavigationRoute<UserListNavigationProps>,
        UserListNavigationProps
    >
}

export const UserListEntry: React.FC<UserListEntryProps> = ({
    id,
    name,
    navigation,
    type
}) => {
    if (!type) {
        type = UserType.Visitor
    }

    return (
        <ListItem
            title={`${name} (${type})`}
            onPress={() =>
                navigation.navigate("SingleUserActions", {
                    id,
                    name,
                    type
                })
            }
            rightIcon={<Icon type="font-awesome" name="angle-right" />}
        />
    )
}

export interface UserListNavigationProps {
    activeUserType: UserType
}

const userListSelectorButtons = ["All", "Visitors", "Employees"]
enum UserListSelector {
    All = 0,
    Visitors = 1,
    Employees = 2
}

export const UserList: React.FC<
    NavigationInjectedProps<UserListNavigationProps>
> = ({navigation}) => {
    const [activeUserType] = [navigation.getParam("activeUserType")]

    const [filter, setFilter] = useState("")
    const [index, setIndex] = useState(UserListSelector.All)
    // TODO: Remove network only once we fix cache invalidation
    const result = useGetAllUsersQuery({fetchPolicy: "no-cache"})
    if (result.errors) {
        return <Text>{result.errors}</Text>
    }
    useEffect(() => {
        const listener = navigation.addListener("willFocus", result.refetch)
        return listener.remove
    }, [])

    let users = (result.data || {AllUsers: []}).AllUsers || []
    if (activeUserType === UserType.Administrator) {
        if (index === UserListSelector.Visitors) {
            users = users.filter(({Type}) => Type === UserType.Visitor)
        } else if (index === UserListSelector.Employees) {
            users = users.filter(({Type}) => Type === UserType.Employee)
        }
    }

    if (filter) {
        users = users.filter(({UserName}) =>
            UserName.toUpperCase().includes(filter.toUpperCase())
        )
    }

    return (
        <View style={{flex: 1}}>
            {activeUserType === UserType.Administrator && (
                <ButtonGroup
                    onPress={setIndex}
                    selectedIndex={index}
                    buttons={userListSelectorButtons}
                />
            )}
            <Input
                placeholder="Filter"
                value={filter}
                onChangeText={setFilter}
            />
            <FlatList
                data={users}
                refreshing={result.loading}
                onRefresh={result.refetch}
                keyExtractor={item => item.Id}
                renderItem={({item: {Id, UserName, Type}}) => (
                    <UserListEntry
                        id={Id}
                        name={UserName}
                        type={Type}
                        navigation={navigation}
                    />
                )}
            />
        </View>
    )
}
