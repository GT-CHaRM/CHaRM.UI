import React, {Component} from "react"

import {StyleSheet, Text, View, TextInput, ScrollView} from "react-native"

import Container from "../components/Container"
import Button from "../components/Button"
import Label from "../components/Label"

export default class Login extends Component<
    {},
    {username: string; password: string}
> {
    state = {username: "", password: ""}
    render() {
        return (
            <ScrollView style={styles.scroll}>
                <Container>
                    <Button
                        label="Forgot Login/pass"
                        styles={{
                            button: styles.alignRight,
                            label: styles.label
                        }}
                        onPress={() => {
                            alert("hello")
                        }}
                    />
                </Container>

                <Container>
                    <Label text="Username or email" />
                    <TextInput
                        ref="username"
                        style={styles.textInput}
                        onChangeText={text => this.setState({username: text})}
                        value={this.state.username}
                    />
                </Container>

                <Container>
                    <Label text="Password" />
                    <TextInput
                        ref="password"
                        secureTextEntry={true}
                        style={styles.textInput}
                        onChangeText={text => this.setState({password: text})}
                        value={this.state.password}
                    />
                </Container>

                <Container>
                    <Button
                        label="Sign In"
                        styles={{
                            button: styles.primaryButton,
                            label: styles.buttonWhiteText
                        }}
                    />
                </Container>
                <Container>
                    <Button
                        label="CANCEL"
                        styles={{label: styles.buttonBlackText}}
                        // onPress={this.press.bind(this)}
                    />
                </Container>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    scroll: {
        backgroundColor: "#e1d7d8",
        padding: 30,
        flexDirection: "column"
    },
    label: {
        color: "#0d8898",
        fontSize: 20
    },
    alignRight: {
        alignSelf: "flex-end"
    },
    textInput: {
        height: 80,
        fontSize: 30,
        backgroundColor: "#FFF"
    },
    buttonWhiteText: {
        fontSize: 20,
        color: "#FFF"
    },
    buttonBlackText: {
        fontSize: 20,
        color: "#595856"
    },
    primaryButton: {
        backgroundColor: "#34A853"
    },
    footer: {
        marginTop: 100
    }
})
