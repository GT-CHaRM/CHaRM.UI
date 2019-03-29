import moment from "moment"
import React, {useContext, useEffect, useRef, useState} from "react"
import {useApolloClient} from "react-apollo-hooks"
import {
    ActivityIndicator,
    Alert,
    FlatList,
    StyleProp,
    TextInput,
    TouchableOpacity,
    View,
    ViewStyle
} from "react-native"
import {Button, ButtonGroup, Icon, ListItem} from "react-native-elements"
import {NavigationInjectedProps} from "react-navigation"
import {
    ItemsQuery,
    SubmissionDocument,
    SubmissionQuery,
    SubmissionQueryVariables,
    SubmissionsDocument,
    SubmissionsQuery,
    useItemsQuery,
    useResetItemSelectedCountsMutation,
    useSubmitItemsMutation,
    useUpdateExistingSubmissionMutation,
    useUpdateItemSelectedCountMutation
} from "../graphql"
import {colors} from "../theme"

// TODO: Up and down buttons need to have better feedback
// TODO: Item count should not be negative

function parseInteger(str: string) {
    for (const char of str) {
        if (isNaN(parseInt(char))) {
            return NaN
        }
    }
    return parseInt(str)
}

function ItemCountSelector({id, count}: {id: string; count: number}) {
    const inputRef = useRef<TextInput>(null)
    const updateItemSelectedCount = useUpdateItemSelectedCountMutation()

    return (
        <ButtonGroup
            containerStyle={{
                width: 125
            }}
            onPress={async selectedIndex => {
                switch (selectedIndex) {
                    case 0:
                        await updateItemSelectedCount({
                            variables: {
                                Id: id,
                                SelectedCount: Math.max(count - 1, 0)
                            }
                        })
                        break
                    case 1:
                        if (inputRef.current) {
                            inputRef.current.focus()
                        }
                        break
                    case 2:
                        await updateItemSelectedCount({
                            variables: {
                                Id: id,
                                SelectedCount: count + 1
                            }
                        })
                        break
                }
            }}
            selectedIndex={1}
            selectedButtonStyle={{
                backgroundColor: "rgba(0, 0, 0, 0.1)"
            }}
            buttons={[
                {
                    element: () => (
                        <Icon name="arrow-down" type="font-awesome" />
                    )
                },
                {
                    element: () => (
                        <TextInput
                            ref={inputRef}
                            value={count.toString()}
                            onChangeText={async count => {
                                if (count === "") {
                                    return
                                }

                                const selectedCount = parseInteger(count)
                                if (isNaN(selectedCount)) {
                                    Alert.alert(
                                        "Error",
                                        "You can only enter numbers here!"
                                    )
                                    return
                                }

                                await updateItemSelectedCount({
                                    variables: {
                                        Id: id,
                                        SelectedCount: selectedCount
                                    }
                                })
                            }}
                            keyboardType="phone-pad"
                            style={{textAlign: "center"}}
                        />
                    )
                },
                {
                    element: () => <Icon name="arrow-up" type="font-awesome" />
                }
            ]}
        />
    )
}

function ItemEntry({
    item: {Id, Description, Name, SelectedCount}
}: {
    item: ItemsQuery["Items"][0]
}) {
    return (
        <ListItem
            title={Name}
            onPress={() => Alert.alert(Name, Description)}
            rightIcon={<ItemCountSelector id={Id} count={SelectedCount} />}
        />
    )
}

function SubmissionList({style}: {style?: StyleProp<ViewStyle>}) {
    const {data, loading, refetch} = useItemsQuery()
    const items = !data || loading ? [] : data.Items

    return (
        <View style={[style, {backgroundColor: colors.background}]}>
            <FlatList
                contentContainerStyle={{
                    backgroundColor: colors.white,
                    marginTop: 0
                }}
                data={items || []}
                renderItem={({item}) => <ItemEntry key={item.Id} item={item} />}
                keyExtractor={({Id}) => Id}
                refreshing={loading}
                onRefresh={refetch}
            />
        </View>
    )
}

function createItemSubmissionList(items: ItemsQuery["Items"]) {
    function* innerFn() {
        for (const {Id, SelectedCount} of items) {
            for (let i = 0; i < SelectedCount; ++i) {
                yield Id
            }
        }
    }
    return [...innerFn()]
}

const useSubmit = (onSubmitted?: (edit: boolean) => Promise<void>) => {
    const submissionId = useSubmissionId()
    const {data} = useItemsQuery()
    const submitNew = useSubmitItemsMutation({
        update: (cache, {data}) => {
            if (!data || !data.CreateSubmissionSelf) {
                return
            }

            try {
                const submissionsData = cache.readQuery<SubmissionsQuery>({
                    query: SubmissionsDocument
                })
                if (!submissionsData) {
                    return
                }

                cache.writeQuery<SubmissionsQuery>({
                    query: SubmissionsDocument,
                    data: {
                        MySubmissions: [
                            data.CreateSubmissionSelf,
                            ...submissionsData.MySubmissions
                        ]
                    }
                })
            } catch {}
        }
    })
    const updateExisting = useUpdateExistingSubmissionMutation({
        update: (cache, {data}) => {
            if (!data || !data.ModifySubmission) {
                return
            }
            const {
                ModifySubmission: {...newSubmission}
            } = data

            try {
                const submissionsData = cache.readQuery<SubmissionsQuery>({
                    query: SubmissionsDocument
                })
                if (!submissionsData) {
                    return
                }

                cache.writeQuery<SubmissionsQuery>({
                    query: SubmissionsDocument,
                    data: {
                        MySubmissions: [
                            ...submissionsData.MySubmissions.map(submission => {
                                if (submission.Id === newSubmission.Id) {
                                    return newSubmission
                                } else {
                                    return submission
                                }
                            })
                        ]
                    }
                })
            } catch {}
        }
    })
    const resetItemSelectedCounts = useResetItemSelectedCountsMutation()

    if (!data) {
        throw ""
    }

    if (submissionId) {
        return async (zipCode: string) => {
            const itemsToSubmit = createItemSubmissionList(data.Items)
            if (itemsToSubmit.length === 0) {
                Alert.alert(
                    "Error: Empty Item List",
                    "You have not selected any items to enter!"
                )
                return
            }
            await updateExisting({
                variables: {
                    Id: submissionId,
                    Time: moment().format("YYYY-MM-DD[T]HH:mm:ss.SSSZ"), // TODO: Check
                    Items: itemsToSubmit,
                    ZipCode: zipCode // TODO: Check this
                }
            })
            await resetItemSelectedCounts()
            if (onSubmitted) {
                await onSubmitted(true)
            }
        }
    } else {
        return async (zipCode: string) => {
            const itemsToSubmit = createItemSubmissionList(data.Items)
            if (itemsToSubmit.length === 0) {
                Alert.alert(
                    "Error: Empty Item List",
                    "You have not selected any items to enter!"
                )
                return
            }
            await submitNew({
                variables: {
                    Items: itemsToSubmit,
                    ZipCode: zipCode // TODO: Check this
                }
            })
            await resetItemSelectedCounts()
            if (onSubmitted) {
                await onSubmitted(false)
            }
        }
    }
}

export interface SubmitButtonProps {}

export const SubmitButton: React.FC<SubmitButtonProps> = ({}) => {
    const submit = useSubmit(async edit => {
        if (edit) {
            Alert.alert("Success", "Successfully editted your submission!")
        } else {
            Alert.alert("Success", "Successfully submitted your items!")
        }
    })

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
                onPress={async () => await submit("")}
                title="SUBMIT"
            />
        </View>
    )
}

const SubmissionIdContext = React.createContext<string | undefined>(undefined)
const useSubmissionId = () => useContext(SubmissionIdContext)

export interface SubmitNavigationProps {
    submissionId?: string
}

export const Submit: React.FC<
    NavigationInjectedProps<SubmitNavigationProps>
> = ({navigation}) => {
    const client = useApolloClient()
    const updateSelectedCount = useUpdateItemSelectedCountMutation()
    const resetItemSelectedCounts = useResetItemSelectedCountsMutation()

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const submissionId = navigation.getParam("submissionId")
        console.log(`submissionId: ${submissionId}`)
        if (!submissionId) {
            setLoading(false)
            return
        }
        ;(async () => {
            const [_, {data}] = await Promise.all([
                resetItemSelectedCounts(),
                client.query<SubmissionQuery, SubmissionQueryVariables>({
                    query: SubmissionDocument,
                    variables: {Id: submissionId}
                })
            ])
            if (!data.MySubmission) {
                setLoading(false)
                return
            }
            await Promise.all(
                data.MySubmission.Items.map(({Count, Item: {Id}}) =>
                    updateSelectedCount({variables: {Id, SelectedCount: Count}})
                )
            )
            setLoading(false)
        })()
    }, [navigation.state.params])
    if (loading) {
        return <ActivityIndicator />
    }

    const submissionId = navigation.getParam("submissionId")
    return (
        <SubmissionIdContext.Provider value={submissionId}>
            <TouchableOpacity
                onPress={async () => {
                    await resetItemSelectedCounts()
                }}>
                <Icon iconStyle={{color: "black"}} name="close" />
            </TouchableOpacity>
            <SubmissionList style={{flex: 1}} />
            <SubmitButton />
        </SubmissionIdContext.Provider>
    )
}
