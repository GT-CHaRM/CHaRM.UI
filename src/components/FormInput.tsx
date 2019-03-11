import React from "react"
import {
    KeyboardTypeOptions,
    NativeSyntheticEvent,
    TextInputSubmitEditingEventData
} from "react-native"
import {Icon, Input} from "react-native-elements"
export function FormInput({
    placeholder,
    iconName,
    value,
    setValue,
    keyboardType,
    secureTextEntry,
    onSubmitEditing
}: {
    placeholder: string
    iconName: string
    value: string
    setValue: React.Dispatch<React.SetStateAction<string>>
    keyboardType?: KeyboardTypeOptions
    secureTextEntry?: boolean
    onSubmitEditing?: (
        event: NativeSyntheticEvent<TextInputSubmitEditingEventData>
    ) => void
}) {
    return (
        <Input
            value={value}
            onChangeText={setValue}
            inputContainerStyle={{
                borderBottomWidth: 0
            }}
            containerStyle={{
                marginBottom: 20,
                backgroundColor: "rgba(0, 0, 0, 0.10)",
                borderRadius: 20
            }}
            inputStyle={{
                fontSize: 24
            }}
            keyboardType={keyboardType}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            onSubmitEditing={onSubmitEditing}
            leftIcon={
                <Icon
                    name={iconName}
                    type="font-awesome"
                    size={16}
                    containerStyle={{marginRight: 10}}
                    color="black"
                />
            }
        />
    )
}
