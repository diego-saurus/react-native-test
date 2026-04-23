import { useRouter } from "expo-router"
import React, { useCallback, useState } from "react"
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import ThemedButton from "@/components/atoms/themed-button"
import ThemedView from "@/components/atoms/themed-view"
import FormField from "@/components/molecules/form-field"
import { ImagePickerField } from "@/components/molecules/image-picker-field"
import TextInputField from "@/components/molecules/text-input-field"

import { imageAssetSchema } from "@/lib/schemas"
import { toSpacing } from "@/utils/theme"
import { zodResolver } from "@hookform/resolvers/zod"

import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"

export default function AddScreen() {
  const router = useRouter()
  const insets = useSafeAreaInsets()

  const form = useForm({
    resolver: zodResolver(
      z.object({
        author: z.string().min(5),
        description: z.string().min(10),
        image: imageAssetSchema(),
      })
    ),
  })

  const [loading, setLoading] = useState(false)

  const handleSubmit = useCallback(() => {
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      Alert.alert("Success", "Image added successfully!", [{ text: "OK", onPress: () => router.back() }])
    }, 2000)
  }, [router])

  const onSubmit = form.handleSubmit(handleSubmit)

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: "padding", android: "height" })}
        style={{ flex: 1 }}
        keyboardVerticalOffset={100}
      >
        <ScrollView contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}>
          <ThemedView
            style={{
              gap: toSpacing(5),
            }}
          >
            <FormProvider {...form}>
              <FormField control={form.control} name="image">
                <ImagePickerField />
              </FormField>
              <FormField control={form.control} label="Author" name="author">
                <TextInputField placeholder="Enter author name..." />
              </FormField>

              <FormField control={form.control} label="Image Details" name="description">
                <TextInputField
                  multiline={true}
                  numberOfLines={8}
                  placeholder="Tell us more about this image..."
                  style={{ height: 134 }}
                  textAlignVertical="top"
                />
              </FormField>
            </FormProvider>
          </ThemedView>

          <ThemedButton
            style={styles.submitButton}
            onPress={onSubmit}
            isLoading={loading}
            size="lg"
            title="Upload Image"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: toSpacing(4),
    flexGrow: 1,
    justifyContent: "space-between",
  },

  submitButton: {
    marginHorizontal: toSpacing(4),
  },
})
