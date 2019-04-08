import React, {MutableRefObject} from "react"
import {
    KeyboardTypeOptions,
    NativeSyntheticEvent,
    TextInputSubmitEditingEventData,
    ViewStyle
} from "react-native"
import {Icon, Input} from "react-native-elements"
export interface FormInputProps {
    inputRef?: MutableRefObject<Input | null>
    style?: ViewStyle
    placeholder: string
    iconName: string
    value: string
    setValue: React.Dispatch<React.SetStateAction<string>>
    keyboardType?: KeyboardTypeOptions
    secureTextEntry?: boolean
    onFocus?: () => void
    onSubmitEditing?: (
        event: NativeSyntheticEvent<TextInputSubmitEditingEventData>
    ) => void
}
export const FormInput: React.FC<FormInputProps> = ({
    inputRef,
    style,
    placeholder,
    iconName,
    value,
    setValue,
    keyboardType,
    secureTextEntry,
    onSubmitEditing,
    onFocus
}) => {
    return (
        <Input
            ref={inputRef}
            value={value}
            onFocus={onFocus}
            onChangeText={setValue}
            inputContainerStyle={{
                borderBottomWidth: 0
            }}
            containerStyle={[
                {
                    marginBottom: 20,
                    backgroundColor: "rgba(0, 0, 0, 0.10)",
                    borderRadius: 20
                },
                style
            ]}
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
