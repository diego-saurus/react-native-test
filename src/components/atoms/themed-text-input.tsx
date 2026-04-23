import { fontSize, radius } from "@/constants/theme"
import { useToTheme } from "@/hooks/use-to-theme"
import { toSpacing } from "@/utils/theme"
import { FC, RefCallback } from "react"
import { StyleSheet, TextInput, TextInputProps } from "react-native"

export interface ThemedTextInputProps extends TextInputProps {
  ref?: RefCallback<TextInput>
}

const ThemedTextInput: FC<ThemedTextInputProps> = ({ style, ...props }) => {
  const { toTheme } = useToTheme()

  return (
    <TextInput
      placeholderTextColor={toTheme("muted")}
      style={[
        {
          backgroundColor: toTheme("input"),
          color: toTheme("foreground"),
          borderColor: toTheme("border"),
          borderWidth: 1,
        },
        styles.input,
        style,
      ]}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    borderRadius: radius.xl,
    paddingHorizontal: toSpacing(4),
    paddingVertical: toSpacing(3.5),
    fontSize: fontSize.normal,
  },
})

export default ThemedTextInput
