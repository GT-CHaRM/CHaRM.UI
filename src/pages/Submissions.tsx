import moment from "moment"
import React from "react"
import {Alert, FlatList, StyleProp, View, ViewStyle} from "react-native"
import {Badge, Button, Card, ListItem} from "react-native-elements"
import {
    NavigationInjectedProps,
    NavigationRoute,
    NavigationScreenProp
} from "react-navigation"
import {
    Scalars,
    SubmissionsDocument,
    SubmissionsQuery,
    useGetAllSubmissionsOfUserQuery,
    useRemoveSubmissionMutation,
    useSubmissionsQuery
} from "../graphql"
import {colors} from "../theme"

// TODO: Auto reload page when we switch tabs
// TODO: Add units to the history page

function SubmissionItemEntry({
    batch: {
        Count,
        Item: {Id, Description, Name}
    }
}: {
    batch: SubmissionsQuery["MySubmissions"][0]["Items"][0]
}) {
    return (
        // EACH LINE ITEM IN THE SUBMISSION CARD //
        <ListItem
            key={Id}
            onPress={() => Alert.alert(Name, Description)}
            rightAvatar={<Badge value={Count} />}
            title={Name}
            containerStyle={{backgroundColor: colors.primaryLight}}
            rightIcon={<View />}
        />
    )
}

export interface SubmissionEntryProps {
    submission: SubmissionsQuery["MySubmissions"][0]
    userId?: Scalars["ID"]
}

export const SubmissionEntry: React.FC<
    SubmissionEntryProps & NavigationInjectedProps
> = ({navigation, userId, submission: {Id, Items, Submitted}}) => {
    const remove = useRemoveSubmissionMutation({
        update: (cache, {data}) => {
            try {
                if (!data || !data.RemoveSubmission) {
                    return
                }
                const {
                    RemoveSubmission: {Id}
                } = data

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
                            ...submissionsData.MySubmissions.filter(
                                submission => submission.Id !== Id
                            )
                        ]
                    }
                })
            } catch {}
        }
    })

    return (
        //card holds one entire submission
        <Card title={`Visited ${moment(Submitted).fromNow()}`}>
            <View style={{flexDirection: "row"}}>
                <Button
                    type="solid"
                    style={{
                        color: "#ff5c5c",
                        backgroundColor: "rgb(255,0,0)"
                    }}
                    containerStyle={{
                        flex: 1
                    }}
                    buttonStyle={{
                        borderRadius: 0,
                        marginLeft: 0,
                        marginRight: 0,
                        marginBottom: 0
                    }}
                    title="Edit"
                    onPress={() => {
                        navigation.navigate("EditSubmissions", {
                            userId: userId,
                            submissionId: Id
                        })
                    }}
                />
                <Button
                    type="solid"
                    style={{
                        color: "#ff5c5c",
                        backgroundColor: "rgb(255,0,0)"
                    }}
                    containerStyle={{
                        flex: 1
                    }}
                    buttonStyle={{
                        borderRadius: 0,
                        marginLeft: 0,
                        marginRight: 0,
                        marginBottom: 0
                    }}
                    title="Delete"
                    onPress={() => {
                        Alert.alert(
                            "Remove Submission",
                            "Are you sure you want to remove this submission?",
                            [
                                {text: "No"},
                                {
                                    text: "Yes",
                                    onPress: async () =>
                                        await remove({variables: {Id}})
                                }
                            ]
                        )
                    }}
                />
            </View>
            <FlatList
                data={Items}
                renderItem={({item: batch}) => (
                    <SubmissionItemEntry batch={batch} />
                )}
                keyExtractor={({Item: {Id}}) => Id}
            />
        </Card>
    )
}

export interface SubmissionListProps {
    navigation: NavigationScreenProp<
        NavigationRoute<SubmissionsNavigationProps>,
        SubmissionsNavigationProps
    >
    style?: StyleProp<ViewStyle>
}

export const SubmissionList: React.FC<SubmissionListProps> = ({
    navigation,
    style
}) => {
    const [userId] = [navigation.getParam("userId")]

    let data: SubmissionsQuery["MySubmissions"],
        loading: boolean,
        refetch: () => Promise<any>
    if (userId === undefined) {
        const submissions = useSubmissionsQuery({
            fetchPolicy: "network-only"
        })
        data = submissions.data ? submissions.data.MySubmissions : []
        loading = submissions.loading
        refetch = submissions.refetch
    } else {
        const submissions = useGetAllSubmissionsOfUserQuery({
            fetchPolicy: "network-only",
            variables: {Id: userId}
        })
        data = submissions.data
            ? submissions.data.GetAllSubmissionsFromUser || []
            : []
        loading = submissions.loading
        refetch = submissions.refetch
    }
    if (loading) {
        data = []
    }

    return (
        <View style={[style, {backgroundColor: colors.background}]}>
            <FlatList
                contentContainerStyle={{
                    backgroundColor: colors.background,
                    marginTop: 0
                }}
                data={data}
                renderItem={({item}) => (
                    <SubmissionEntry
                        key={item.Id}
                        userId={userId}
                        navigation={navigation}
                        submission={item}
                    />
                )}
                keyExtractor={({Id}) => Id}
                refreshing={loading}
                onRefresh={refetch}
            />
        </View>
    )
}

export interface SubmissionsNavigationProps {
    userId?: Scalars["ID"]
}

export const Submissions: React.FC<
    NavigationInjectedProps<SubmissionsNavigationProps>
> = ({navigation}) => {
    return <SubmissionList navigation={navigation} style={{flex: 1}} />
}
