import React, {ReactElement, useState} from "react"
import {Overlay, OverlayProps} from "react-native-elements"

export const useOverlay = (
    render: () => ReactElement,
    overlayProps?: Partial<OverlayProps>,
    initial?: boolean
): [React.FC<{}>, React.Dispatch<React.SetStateAction<boolean>>] => {
    const [visible, setVisible] = useState(initial || false)
    const Component: React.FC<{}> = () => {
        return (
            <Overlay
                onBackdropPress={() => setVisible(false)}
                isVisible={visible}
                {...overlayProps}>
                {render()}
            </Overlay>
        )
    }
    return [Component, setVisible]
}
