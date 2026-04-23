import ThemedButton from "@/components/atoms/themed-button"
import ThemedText from "@/components/atoms/themed-text"
import CameraIcon from "@/components/icons/camera"

import { radius } from "@/constants/theme"
import { useToTheme } from "@/hooks/use-to-theme"
import { useFormFieldContext } from "@/providers/form-field"
import { toSpacing } from "@/utils/theme"

import { launchImageLibraryAsync, requestMediaLibraryPermissionsAsync } from "expo-image-picker"
import React, { FC, useCallback } from "react"
import { useController } from "react-hook-form"
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native"

export interface ImagePickerFieldProps {
  label?: string
  hint?: string
  aspectRatio?: [number, number]
}

export const ImagePickerField: FC<ImagePickerFieldProps> = ({
  hint = "Upload a high-quality photo from your gallery",
  label = "Tap To select image",
  aspectRatio = [4, 3],
}) => {
  const { toTheme } = useToTheme()
  const { name } = useFormFieldContext()
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name })

  const handlePick = useCallback(async () => {
    const { status } = await requestMediaLibraryPermissionsAsync()
    if (status !== "granted") return

    const result = await launchImageLibraryAsync({
      mediaTypes: "images",
      selectionLimit: 1,
      aspect: aspectRatio,
      allowsEditing: true,
      quality: 0.85,
    })

    if (!result.canceled && result.assets.length > 0) {
      onChange(result.assets[0])
    }
  }, [onChange, aspectRatio])

  const handleRemove = useCallback(() => onChange(null), [onChange])

  const hasImage = Boolean(value?.uri)

  return (
    <TouchableOpacity
      style={[
        {
          borderColor: toTheme("border"),
          backgroundColor: toTheme("input"),
        },
        styles.dropzone,
        hasImage && {
          borderColor: toTheme("primary"),
          borderStyle: "solid",
          minHeight: 240,
        },
        error && {
          borderColor: toTheme("destructive"),
        },
      ]}
      onPress={handlePick}
      activeOpacity={0.75}
      accessibilityLabel="Select image"
      accessibilityRole="button"
    >
      {hasImage ? (
        <View style={styles.previewContainer}>
          <Image source={{ uri: value.uri }} style={styles.preview} resizeMode="center" />
          <Pressable
            style={styles.removeButton}
            onPress={(e) => {
              e.stopPropagation?.()
              handleRemove()
            }}
            accessibilityLabel="Remove image"
            hitSlop={8}
          >
            <Text style={styles.removeIcon}>✕</Text>
          </Pressable>
          <View style={styles.changeOverlay}>
            <Text style={styles.changeText}>Tap to change</Text>
          </View>
        </View>
      ) : (
        <View style={styles.placeholder}>
          <CameraIcon />
          <View style={styles.placeholderInstruction}>
            <ThemedText type="defaultSemiBold">{label}</ThemedText>
            <ThemedText style={{ textAlign: "center" }}>{hint}</ThemedText>
          </View>
          <ThemedButton onPress={handlePick} size="sm" title="Select Image" />
        </View>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  dropzone: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderRadius: radius["4xl"],
    overflow: "hidden",
    minHeight: 270,
    justifyContent: "center",
    alignItems: "center",
  },

  placeholder: {
    alignItems: "center",
    paddingHorizontal: toSpacing(6),
    gap: toSpacing(4),
  },

  placeholderInstruction: {
    alignItems: "center",
    gap: toSpacing(2),
  },

  previewContainer: {
    width: "100%",
    minHeight: 240,
  },
  preview: {
    width: "100%",
    minHeight: 240,
  },
  removeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  removeIcon: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
  },
  changeOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.38)",
    paddingVertical: 10,
    alignItems: "center",
  },
  changeText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
})
