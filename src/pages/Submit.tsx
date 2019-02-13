import React from "react"
import {FlatList, StyleProp, TextInput, View, ViewStyle} from "react-native"
import {Button, ButtonGroup, Icon, ListItem} from "react-native-elements"
import {
    ItemsItems,
    useItems,
    useResetItemSelectedCounts,
    useSubmitItems,
    useUpdateItemSelectedCount
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
    const updateItemSelectedCount = useUpdateItemSelectedCount()

    return (
        <ButtonGroup
            containerStyle={{width: 125}}
            onPress={async selectedIndex => {
                if (selectedIndex === 0) {
                    await updateItemSelectedCount({
                        variables: {
                            id,
                            selectedCount: Math.max(count - 1, 0)
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
                                    alert("You can only enter numbers here!")
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
                    element: () => <Icon name="arrow-up" type="font-awesome" />
                }
            ]}
        />
    )
}

function ItemEntry({item: {id, name, selectedCount}}: {item: ItemsItems}) {
    return (
        <ListItem
            title={name}
            onLongPress={() => alert(name)}
            rightIcon={<ItemCountSelector id={id} count={selectedCount} />}
        />
    )
}

function SubmissionList({style}: {style?: StyleProp<ViewStyle>}) {
    const {
        data: {items},
        loading
    } = useItems()

    return (
        <View style={[style, {backgroundColor: colors.background}]}>
            <FlatList
                contentContainerStyle={{
                    backgroundColor: colors.white,
                    marginTop: 0
                }}
                data={items || []}
                renderItem={({item}) => <ItemEntry key={item.id} item={item} />}
                keyExtractor={({id}) => id}
                refreshing={loading}
            />
        </View>
    )
}

function createItemSubmissionList(items: ItemsItems[]) {
    function* innerFn() {
        for (const {id, selectedCount} of items) {
            for (let i = 0; i < selectedCount; ++i) {
                yield id
            }
        }
    }
    return [...innerFn()]
}

function SubmitButton() {
    const {
        data: {items}
    } = useItems()
    const submit = useSubmitItems()
    const resetItemSelectedCounts = useResetItemSelectedCounts()

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
                onPress={async () => {
                    const itemsToSubmit = createItemSubmissionList(items)
                    if (itemsToSubmit.length === 0) {
                        alert("You have not selected any items to enter!")
                        return
                    }
                    await submit({
                        variables: {
                            items: itemsToSubmit
                        }
                    })
                    await resetItemSelectedCounts({})
                    alert("Successfully submitted your items!")
                }}
                title="SUBMIT"
            />
        </View>
    )
}

export function Submit() {
    return (
        <View style={{flex: 1}}>
            <SubmissionList style={{flex: 1}} />
            <SubmitButton />
        </View>
    )
}
