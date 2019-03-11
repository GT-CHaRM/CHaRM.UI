function atob(input: string) {
    const str = input.replace(/=+$/, "")
    let output = ""

    if (str.length % 4 === 1) {
        throw new Error(
            "'atob' failed: The string to be decoded is not correctly encoded."
        )
    }
    for (
        let bc = 0, bs = 0, buffer, i = 0;
        (buffer = str.charAt(i++));
        ~buffer && ((bs = bc % 4 ? bs * 64 + buffer : buffer), bc++ % 4)
            ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
            : 0
    ) {
        buffer = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(
            buffer
        )
    }

    return output
}

export function tokenExpired(jwt: string) {
    if (!jwt) {
        return true
    }

    const [_, payloadString, ...__] = jwt.split(".")
    const payload = JSON.parse(atob(payloadString))
    if (!payload || !payload.hasOwnProperty("exp")) {
        return false
    }
    return payload.exp * 1000.0 <= Date.now()
}
