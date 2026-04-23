import FormMessage from "@/components/atoms/form-message"
import ThemedText from "@/components/atoms/themed-text"
import { FormFieldProvider } from "@/providers/form-field"
import { ReactNode } from "react"
import type { Control, FieldPath, FieldValues } from "react-hook-form"
import { StyleSheet, View } from "react-native"

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  children,
  label,
}: {
  label?: string

  name: TName
  control: Control<TFieldValues, unknown, TFieldValues>
  children: ReactNode
}) => {
  return (
    <FormFieldProvider value={{ name }}>
      <View>
        {label && (
          <ThemedText type="subtitle" style={styles.label}>
            {label}
          </ThemedText>
        )}
        {children}
        <FormMessage />
      </View>
    </FormFieldProvider>
  )
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 8,
    fontSize: 16,
  },
})

export default FormField
