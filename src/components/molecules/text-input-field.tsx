import { useToTheme } from "@/hooks/use-to-theme"
import { useFormFieldContext } from "@/providers/form-field"
import { useController } from "react-hook-form"
import { TextInputProps } from "react-native"
import ThemedTextInput from "../atoms/themed-text-input"

const TextInputField = ({ style, ...props }: Omit<TextInputProps, "editable" | "onChangeText" | "value" | "ref">) => {
  const { name } = useFormFieldContext()
  const { field } = useController({ name })

  const { toTheme } = useToTheme()

  return (
    <ThemedTextInput
      ref={field.ref}
      editable={field.disabled}
      onChangeText={field.onChange}
      value={field.value?.toString()}
      placeholderTextColor={toTheme("muted")}
      {...props}
    />
  )
}

export default TextInputField
