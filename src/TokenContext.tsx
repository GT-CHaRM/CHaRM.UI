import React from "react"
export const TokenContext = React.createContext<(token: string) => void>(
    (_: string) => {}
)
