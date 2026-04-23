import { fontSize, radius } from "@/constants/theme"
import { useToTheme } from "@/hooks/use-to-theme"
import { useFormFieldContext } from "@/providers/form-field"
import { toSpacing } from "@/utils/theme"
import { useController } from "react-hook-form"
import { StyleSheet, TextInput, TextInputProps } from "react-native"

const TextInputField = ({ style, ...props }: Omit<TextInputProps, "editable" | "onChangeText" | "value" | "ref">) => {
  const { name } = useFormFieldContext()
  const { field } = useController({ name })

  const { toTheme } = useToTheme()

  return (
    <TextInput
      ref={field.ref}
      editable={field.disabled}
      onChangeText={field.onChange}
      value={field.value?.toString()}
      placeholderTextColor={toTheme("muted")}
      style={[
        { backgroundColor: toTheme("input"), color: toTheme("text"), borderColor: toTheme("border"), borderWidth: 1 },
        styles.input,
        style,
      ]}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    height: toSpacing(11),
    borderRadius: radius.xl,
    paddingHorizontal: toSpacing(4),
    paddingVertical: toSpacing(3.5),
    fontSize: fontSize.normal,
  },
})

export default TextInputField
