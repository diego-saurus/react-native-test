import React, { useMemo } from "react"
import { ActivityIndicator, Pressable, StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native"

import ThemedText from "@/components/atoms/themed-text"
import { useToTheme } from "@/hooks/use-to-theme"

import { ColorName, fontSize, radius } from "@/constants/theme"
import { toSpacing } from "@/utils/theme"
import { FC } from "react"
import { PressableProps } from "react-native"

interface ThemedButtonProps extends PressableProps {
  variant?: ColorName
  isLoading?: boolean
  size?: keyof typeof sizes
  title?: string
}

const sizes = {
  lg: { height: toSpacing(12), fontSize: fontSize.normal },
  md: { height: toSpacing(10), fontSize: fontSize.sm },
  sm: { height: toSpacing(9), fontSize: fontSize.xs },
}

const ThemedButton: FC<ThemedButtonProps> = ({ variant = "primary", size = "md", isLoading, disabled, ...props }) => {
  const { toTheme } = useToTheme()

  const variants = useMemo(
    () =>
      ({
        primary: {
          container: { backgroundColor: toTheme("primary") },
          text: { color: toTheme("primary-foreground") },
          indicatorColor: toTheme("primary-foreground"),
        },
      }) as Record<ColorName, { container: StyleProp<ViewStyle>; text: StyleProp<TextStyle>; indicatorColor: string }>,
    [variant]
  )

  const { text, container, indicatorColor } = variants?.[variant] ?? variants.primary
  const { height, fontSize } = sizes[size] ?? sizes.md

  return (
    <Pressable
      style={({ pressed }) => [
        { height },
        container,
        styles.button,
        (pressed || isLoading || disabled) && styles.buttonLoading,
      ]}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color={indicatorColor} />
      ) : (
        <ThemedText style={[{ fontSize }, text, styles.buttonText]}>Upload Image</ThemedText>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: radius.xl,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonLoading: { opacity: 0.6 },
  buttonText: { fontWeight: "semibold" },
})

export default ThemedButton
