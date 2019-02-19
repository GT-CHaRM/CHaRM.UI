import {AsyncStorage} from "react-native"

export async function saveToken(token: string) {
    await AsyncStorage.setItem("Token", token)
}
