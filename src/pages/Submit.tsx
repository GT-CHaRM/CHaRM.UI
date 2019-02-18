import React from "react"
import {FlatList, StyleProp, TextInput, View, ViewStyle} from "react-native"
import {Button, ButtonGroup, Icon, ListItem} from "react-native-elements"
import {WithHeader} from "../components"
import {
    ItemsItems,
    useItems,
    useMyZipCode,
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
                            Id: id,
                            SelectedCount: Math.max(count - 1, 0)
                        }
                    })
                } else if (selectedIndex === 2) {
                    await updateItemSelectedCount({
                        variables: {
                            Id: id,
                            SelectedCount: count + 1
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

function ItemEntry({item: {Id, Name, SelectedCount}}: {item: ItemsItems}) {
    return (
        <ListItem
            title={Name}
            onLongPress={() => alert(Name)}
            rightIcon={<ItemCountSelector id={Id} count={SelectedCount} />}
        />
    )
}

function SubmissionList({style}: {style?: StyleProp<ViewStyle>}) {
    const {
        data: {Items},
        loading
    } = useItems()

    return (
        <View style={[style, {backgroundColor: colors.background}]}>
            <FlatList
                contentContainerStyle={{
                    backgroundColor: colors.white,
                    marginTop: 0
                }}
                data={Items || []}
                renderItem={({item}) => <ItemEntry key={item.Id} item={item} />}
                keyExtractor={({Id}) => Id}
                refreshing={loading}
            />
        </View>
    )
}

function createItemSubmissionList(items: ItemsItems[]) {
    function* innerFn() {
        for (const {Id, SelectedCount} of items) {
            for (let i = 0; i < SelectedCount; ++i) {
                yield Id
            }
        }
    }
    return [...innerFn()]
}

function SubmitButton() {
    const {
        data: {Items}
    } = useItems()
    const {
        data: {
            Me: {ZipCode}
        }
    } = useMyZipCode()
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
                    const itemsToSubmit = createItemSubmissionList(Items)
                    if (itemsToSubmit.length === 0) {
                        alert("You have not selected any items to enter!")
                        return
                    }
                    await submit({
                        variables: {
                            Items: itemsToSubmit,
                            ZipCode
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
        <WithHeader>
            <SubmissionList style={{flex: 1}} />
            <SubmitButton />
        </WithHeader>
    )
}
