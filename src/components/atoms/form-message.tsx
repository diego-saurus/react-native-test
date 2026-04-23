import { useFormFieldContext } from "@/providers/form-field"

import { FC, useMemo } from "react"
import { FieldError } from "react-hook-form"
import { TextProps } from "react-native"
import ThemedText from "./themed-text"

const FormMessage: FC<TextProps> = ({ children, ...props }) => {
  const { error } = useFormFieldContext()

  const errorMessage = useMemo(() => {
    if (!error) return null

    return (
      error.message ??
      Object.values(error)
        .map((e) => (e as FieldError).message)
        .join(", ")
    )
  }, [error])

  const body = errorMessage ?? children

  if (!body) return null

  return (
    <ThemedText colorName="destructive" {...props}>
      {body}
    </ThemedText>
  )
}

export default FormMessage
