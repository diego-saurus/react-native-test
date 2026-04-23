import { createContext, useContext } from "react"
import type { FieldPath, FieldValues } from "react-hook-form"
import { useFormContext } from "react-hook-form"

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
}

const FormFieldContext = createContext<FormFieldContextValue>({} as FormFieldContextValue)

export const FormFieldProvider = FormFieldContext.Provider

export const useFormFieldContext = () => {
  const fieldContext = useContext(FormFieldContext)
  const { getFieldState, formState, ...rest } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) throw new Error("useFormField should be used within <FormField>")

  return {
    name: fieldContext.name,
    ...fieldState,
    ...rest,
  }
}
