import { useFormFieldContext } from "@/providers/form-field"

import { FC } from "react"
import { TextProps } from "react-native"
import ThemedText from "./themed-text"

const FormMessage: FC<TextProps> = ({ children, ...props }) => {
  const { error } = useFormFieldContext()
  const body = error ? String(error?.message) : children

  if (!body) return null

  return (
    <ThemedText colorName="destructive" {...props}>
      {body}
    </ThemedText>
  )
}

export default FormMessage
