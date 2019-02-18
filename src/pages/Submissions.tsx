import moment from "moment"
import React from "react"
import {FlatList, StyleProp, View, ViewStyle} from "react-native"
import {Badge, Card, ListItem} from "react-native-elements"
import {WithHeader} from "../components"
import {
    SubmissionsItem,
    SubmissionsSubmissions,
    useSubmissions
} from "../graphql"
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
        <ListItem
            key={Id}
            rightAvatar={<Badge value={count} />}
            title={Name}
            containerStyle={{backgroundColor: colors.primaryLight}}
            rightIcon={<View />}
        />
    )
}

function SubmissionEntry({
    submission: {Items, Submitted}
}: {
    submission: SubmissionsSubmissions
}) {
    return (
        <Card title={`Visited ${moment(Submitted).fromNow()}`}>
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
    const {
        data: {Submissions},
        loading,
        refetch
    } = useSubmissions()

    return (
        <View style={[style, {backgroundColor: colors.background}]}>
            <FlatList
                contentContainerStyle={{
                    backgroundColor: colors.background,
                    marginTop: 0
                }}
                data={Submissions || []}
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

export function Submissions() {
    return (
        <WithHeader>
            <SubmissionList style={{flex: 1}} />
        </WithHeader>
    )
}
