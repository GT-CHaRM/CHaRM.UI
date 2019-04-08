import AsyncStorage from "@react-native-community/async-storage"

export async function getToken() {
    return await AsyncStorage.getItem("Token")
}

export async function saveToken(token: string) {
    await AsyncStorage.setItem("Token", token)
}
