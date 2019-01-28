import React from "react"
import {View, ViewStyle, StyleProp, FlatList} from "react-native"
import {Badge, List, ListItem, Card} from "react-native-elements"
import {
    SubmissionsComponent,
    SubmissionsSubmissions,
    SubmissionsItem
} from "../graphql"
import {colors} from "../theme"
import moment from "moment"

const SubmissionItemEntry = ({
    item: {id, name},
    count
}: {
    item: SubmissionsItem
    count: number
}) => (
    <ListItem
        key={id}
        avatar={<Badge value={count} />}
        title={name}
        containerStyle={{backgroundColor: colors.primaryLight}}
        rightIcon={<View />}
    />
)

const SubmissionEntry = ({
    submission: {items, submitted}
}: {
    submission: SubmissionsSubmissions
}) => (
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

const SubmissionList = ({style}: {style?: StyleProp<ViewStyle>}) => (
    <View style={[style, {backgroundColor: colors.background}]}>
        <List
            containerStyle={{
                backgroundColor: colors.background,
                marginTop: 0
            }}>
            <SubmissionsComponent>
                {({data: {submissions}, loading, refetch}) => (
                    <FlatList
                        data={submissions || []}
                        renderItem={({item}) => (
                            <SubmissionEntry key={item.id} submission={item} />
                        )}
                        keyExtractor={({id}) => id}
                        refreshing={loading}
                        onRefresh={refetch}
                    />
                )}
            </SubmissionsComponent>
        </List>
    </View>
)

export const Submissions = () => {
    return (
        <View style={{flex: 1}}>
            <SubmissionList style={{flex: 1}} />
        </View>
    )
}
