import React from "react"
import {
    View,
    ViewStyle,
    StyleProp,
    Text,
    FlatList,
    TextInput
} from "react-native"
import {List, ListItem, Button, ButtonGroup, Icon} from "react-native-elements"
import {
    ItemsComponent,
    ItemsItems,
    UpdateItemSelectedCountComponent,
    SubmitItemsComponent,
    ResetItemSelectedCountsComponent
} from "../graphql"
import {colors} from "../theme"

const parseInteger = (str: string) => {
    for (const char of str) {
        if (isNaN(parseInt(char))) {
            return NaN
        }
    }
    return parseInt(str)
}

const ItemRight = ({id, count}: {id: string; count: number}) => (
    <UpdateItemSelectedCountComponent>
        {updateItemSelectedCount => (
            <ButtonGroup
                containerStyle={{width: 125}}
                onPress={async selectedIndex => {
                    if (selectedIndex === 0) {
                        await updateItemSelectedCount({
                            variables: {
                                id,
                                selectedCount: count - 1
                            }
                        })
                    } else if (selectedIndex === 2) {
                        await updateItemSelectedCount({
                            variables: {
                                id,
                                selectedCount: count + 1
                            }
                        })
                    }
                }}
                selectedIndex={1}
                buttons={[
                    {
                        element: () => (
                            <Icon name="arrow-down" type="font-awesome" />
                        )
                    },
                    {
                        element: () => (
                            <TextInput
                                value={count.toString()}
                                onChangeText={async count => {
                                    if (count === "") {
                                        return
                                    }

                                    const selectedCount = parseInteger(count)
                                    if (isNaN(selectedCount)) {
                                        alert(
                                            "You can only enter numbers here!"
                                        )
                                        return
                                    }

                                    await updateItemSelectedCount({
                                        variables: {
                                            id,
                                            selectedCount: selectedCount
                                        }
                                    })
                                }}
                                keyboardType="phone-pad"
                                style={{textAlign: "center"}}
                            />
                        )
                    },
                    {
                        element: () => (
                            <Icon name="arrow-up" type="font-awesome" />
                        )
                    }
                ]}
            />
        )}
    </UpdateItemSelectedCountComponent>
)

const ItemEntry = ({item: {id, name, selectedCount}}: {item: ItemsItems}) => (
    <ListItem
        title={name}
        onLongPress={() => alert(name)}
        rightIcon={<ItemRight id={id} count={selectedCount} />}
    />
)

const SubmissionList = ({style}: {style?: StyleProp<ViewStyle>}) => (
    <View style={[style, {backgroundColor: colors.background}]}>
        <List
            containerStyle={{
                backgroundColor: colors.white,
                marginTop: 0
            }}>
            <ItemsComponent>
                {({data: {items}, loading}) => (
                    <FlatList
                        data={items || []}
                        renderItem={({item}) => (
                            <ItemEntry key={item.id} item={item} />
                        )}
                        keyExtractor={({id}) => id}
                        refreshing={loading}
                    />
                )}
            </ItemsComponent>
        </List>
    </View>
)

const createItemSubmissionList = (items: ItemsItems[]) => {
    function* innerFn() {
        for (const {id, selectedCount} of items) {
            for (let i = 0; i < selectedCount; ++i) {
                yield id
            }
        }
    }
    return [...innerFn()]
}

const SubmitButton = () => (
    <ItemsComponent>
        {({data: {items}}) => (
            <SubmitItemsComponent>
                {submit => (
                    <ResetItemSelectedCountsComponent>
                        {resetItemSelectedCounts => (
                            <View
                                style={{
                                    flexDirection: "column"
                                }}>
                                <Button
                                    containerViewStyle={{
                                        marginLeft: 0,
                                        marginRight: 0
                                    }}
                                    backgroundColor={colors.primary}
                                    onPress={async () => {
                                        const itemsToSubmit = createItemSubmissionList(
                                            items
                                        )
                                        if (itemsToSubmit) {
                                            alert(
                                                "You have not selected any items to enter!"
                                            )
                                            return
                                        }
                                        await submit({
                                            variables: {
                                                items: itemsToSubmit
                                            }
                                        })
                                        await resetItemSelectedCounts({})
                                        alert(
                                            "Successfully submitted your items!"
                                        )
                                    }}
                                    title="SUBMIT"
                                />
                            </View>
                        )}
                    </ResetItemSelectedCountsComponent>
                )}
            </SubmitItemsComponent>
        )}
    </ItemsComponent>
)

export const Submit = () => {
    return (
        <View style={{flex: 1}}>
            <SubmissionList style={{flex: 1}} />
            <SubmitButton />
        </View>
    )
}
