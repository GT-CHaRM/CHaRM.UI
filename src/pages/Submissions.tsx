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
    item: {id, name},
    count
}: {
    item: SubmissionsItem
    count: number
}) {
    return (
        <ListItem
            key={id}
            rightAvatar={<Badge value={count} />}
            title={name}
            containerStyle={{backgroundColor: colors.primaryLight}}
            rightIcon={<View />}
        />
    )
}

function SubmissionEntry({
    submission: {items, submitted}
}: {
    submission: SubmissionsSubmissions
}) {
    return (
        <Card title={`Visited ${moment(submitted).fromNow()}`}>
            <FlatList
                data={items}
                renderItem={({item: {item, count}}) => (
                    <SubmissionItemEntry item={item} count={count} />
                )}
                keyExtractor={({item: {id}}) => id}
            />
        </Card>
    )
}

function SubmissionList({style}: {style?: StyleProp<ViewStyle>}) {
    const {
        data: {submissions},
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
                data={submissions || []}
                renderItem={({item}) => (
                    <SubmissionEntry key={item.id} submission={item} />
                )}
                keyExtractor={({id}) => id}
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
