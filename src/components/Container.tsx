import React from "react"
import {StyleSheet, View} from "react-native"

export function Container(props) {
    return <View style={styles.labelContainer}>{props.children}</View>
}

const styles = StyleSheet.create({
    labelContainer: {
        marginBottom: 20
    }
})
