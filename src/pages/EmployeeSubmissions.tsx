import moment from "moment"
import React from "react"
import {FlatList, StyleProp, View, ViewStyle} from "react-native"
import {Badge, Button, Card, ListItem} from "react-native-elements"
import {WithHeader} from "../components"
import {Submission, useEmployeeSubmissionsQuery} from "../graphql"
import {colors} from "../theme"

// TODO: Auto reload page when we switch tabs
// TODO: Add units to the history page

function SubmissionItemEntry({
    item: {Id, Name},
    count
}: {
    item: SubmissionsItem
    count: number
}) {
    return (
        // EACH LINE ITEM IN THE SUBMISSION CARD //
        <ListItem
            key={Id}
            rightAvatar={<Badge value={count} />}
            title={Name}
            containerStyle={{backgroundColor: colors.primaryLight}}
            rightIcon={<View />}
        />
    )
}

// https://react-native-training.github.io/react-native-elements/docs/card.html
function SubmissionEntry({
    submission: {Items, Submitted}
}: {
    submission: Submission
}) {
    return (
        //card holds one entire submission
        <Card title={`Visited ${moment(Submitted).fromNow()}`}>
            <Button
                // icon={<Icon name="code" color="#ff0000" />}
                type="solid"
                style={{
                    color: "#ff5c5c",
                    backgroundColor: "rgb(255,0,0)"
                }}
                buttonStyle={{
                    borderRadius: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    marginBottom: 0
                }}
                title="Delete submission"

                /*
                 * We need to finish onPress - but first, we need the mutation and hook to be generated.
                 */

                // onPress={async () => {
                //     //delete card
                //     const data={Items}
                //     const removeSubmission = useRemoveSubmissionMutation()
                //     await submit({
                //         variables: {
                //             Items: itemsToSubmit,
                //             ZipCode
                //         }
                //     })
                // }}
            />
            <FlatList
                data={Items}
                renderItem={({item: {Item, Count}}) => (
                    <SubmissionItemEntry item={Item} count={Count} />
                )}
                keyExtractor={({Item: {Id}}) => Id}
            />
        </Card>
    )
}

function SubmissionList({style}: {style?: StyleProp<ViewStyle>}) {
    const {data, loading, refetch} = useEmployeeSubmissionsQuery()

    return (
        <View style={[style, {backgroundColor: colors.background}]}>
            <FlatList
                contentContainerStyle={{
                    backgroundColor: colors.background,
                    marginTop: 0
                }}
                data={loading ? [] : data.Submission.All}
                renderItem={({item}) => (
                    <SubmissionEntry key={item.Id} submission={item} />
                )}
                keyExtractor={({Id}) => Id}
                refreshing={loading}
                onRefresh={refetch}
            />
        </View>
    )
}

export function EmployeeSubmissions() {
    return (
        <WithHeader>
            <SubmissionList style={{flex: 1}} />
        </WithHeader>
    )
}
