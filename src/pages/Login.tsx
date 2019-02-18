import React, {useState} from "react"
import {ScrollView, StyleSheet, TextInput} from "react-native"
import {Button, Container, Label, WithHeader} from "../components"

export function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    return (
        <WithHeader>
            <ScrollView style={styles.scroll}>
                <Container>
                    <Button
                        label="Forgot Login/pass"
                        styles={{
                            button: styles.alignRight,
                            label: styles.label
                        }}
                    />
                </Container>

                <Container>
                    <Label text="Username or email" />
                    <TextInput
                        style={styles.textInput}
                        onChangeText={username => setUsername(username)}
                        value={username}
                    />
                </Container>

                <Container>
                    <Label text="Password" />
                    <TextInput
                        secureTextEntry={true}
                        style={styles.textInput}
                        onChangeText={password => setPassword(password)}
                        value={password}
                    />
                </Container>

                <Container>
                    <Button
                        label="Sign In"
                        styles={{
                            button: styles.primaryButton,
                            label: styles.buttonWhiteText
                        }}
                        onPress={() => {
                            alert(username + " : " + password)
                        }}
                    />
                </Container>
                <Container>
                    <Button
                        label="CANCEL"
                        styles={{label: styles.buttonBlackText}}
                        onPress={() => {
                            alert("Don't Panic!")
                        }}
                    />
                </Container>
            </ScrollView>
        </WithHeader>
    )
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
