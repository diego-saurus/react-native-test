import { useRouter } from "expo-router"
import React, { useCallback, useState } from "react"
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import ThemedText from "@/components/atoms/themed-text"
import ThemedView from "@/components/atoms/themed-view"
import FormField from "@/components/molecules/form-field"
import TextInputField from "@/components/molecules/text-input-field"
import { useToTheme } from "@/hooks/use-to-theme"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"

export default function AddScreen() {
  const router = useRouter()
  const { toTheme } = useToTheme()
  const insets = useSafeAreaInsets()

  const form = useForm({
    resolver: zodResolver(
      z.object({
        author: z.string().min(5),
        description: z.string().min(10),
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

  const onSubmit = form.handleSubmit(() => handleSubmit())

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={100}
      >
        <ScrollView contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}>
          <FormProvider {...form}>
            <FormField control={form.control} label="Author" name="author">
              <TextInputField placeholder="Enter author name..." />
            </FormField>

            <FormField control={form.control} label="Image Details" name="description">
              <TextInputField
                multiline={true}
                numberOfLines={10}
                placeholder="Tell us more about this image..."
                style={{ height: 134 }}
              />
            </FormField>
          </FormProvider>

          <Pressable
            style={({ pressed }) => [
              { backgroundColor: toTheme("primary") },
              styles.button,
              (pressed || loading) && styles.buttonDisabled,
            ]}
            onPress={onSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={toTheme("background")} />
            ) : (
              <ThemedText style={[{ color: toTheme("primary-foreground") }, styles.buttonText]}>
                Upload Image
              </ThemedText>
            )}
          </Pressable>
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
    padding: 20,
  },
  button: {
    height: 54,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
  },
})
