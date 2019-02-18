import React from "react"
import {StyleSheet, Text, TouchableHighlight} from "react-native"

export function Button(props) {
    function getContent() {
        if (props.children) {
            return props.children
        }
        return <Text style={props.styles.label}>{props.label}</Text>
    }

    return (
        <TouchableHighlight
            underlayColor="#ccc"
            onPress={props.onPress}
            style={[
                props.noDefaultStyles ? "" : styles.button,
                props.styles ? props.styles.button : ""
            ]}>
            {getContent()}
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        padding: 20
    }
})
