import React from "react"
import {View} from "react-native"
import {ButtonGroup, Header, Icon, Text} from "react-native-elements"
import {tabs} from "./App"
import {useCurrentTab, useSetCurrentTab} from "./graphql"
import {colors} from "./theme"

export function MainView() {
    const {
        data: {currentTab}
    } = useCurrentTab()
    const setCurrentTab = useSetCurrentTab()
    return (
        <View style={{flex: 1}}>
            <Header
                backgroundColor={colors.primary}
                centerComponent={{
                    text: tabs[currentTab].name.toUpperCase(),
                    style: {
                        fontSize: 20,
                        color: "#fff"
                    }
                }}
            />
            {tabs[currentTab].component}
            <ButtonGroup
                onPress={index =>
                    setCurrentTab({
                        variables: {tab: index}
                    })
                }
                selectedIndex={currentTab}
                buttons={tabs.map(({buttonName, icon: {name, type}}) => ({
                    element: () => (
                        <View>
                            <Icon name={name} type={type} />
                            <Text
                                style={{
                                    marginTop: 5,
                                    fontSize: 12
                                }}>
                                {buttonName}
                            </Text>
                        </View>
                    )
                }))}
                containerStyle={{
                    height: 65,
                    marginRight: 0,
                    marginLeft: 0,
                    marginBottom: 0,
                    marginTop: 0
                }}
            />
        </View>
    )
}
