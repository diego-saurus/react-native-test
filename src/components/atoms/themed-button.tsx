import React, { Fragment, ReactNode, useMemo } from "react"
import { ActivityIndicator, Pressable, StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native"

import ThemedText from "@/components/atoms/themed-text"
import { useToTheme } from "@/hooks/use-to-theme"

import { fontSize, radius } from "@/constants/theme"
import { toSpacing } from "@/utils/theme"
import { FC } from "react"
import { PressableProps } from "react-native"

type ButtonVariant = "primary" | "link" | "none"

interface ThemedButtonProps extends PressableProps {
  variant?: ButtonVariant
  isLoading?: boolean
  size?: keyof typeof sizes
  title?: string
  icon?: ReactNode
}

const sizes = {
  lg: { height: toSpacing(12), fontSize: fontSize.normal, borderRadius: radius["2xl"] },
  md: { height: toSpacing(10), fontSize: fontSize.sm, borderRadius: radius.lg },
  sm: { height: toSpacing(9), fontSize: fontSize.xs, borderRadius: radius.md },
}

const ThemedButton: FC<ThemedButtonProps> = ({
  variant = "primary",
  size = "md",
  isLoading,
  disabled,
  style,
  title,
  icon,
  ...props
}) => {
  const { toTheme } = useToTheme()

  const variants = useMemo(
    () =>
      ({
        primary: {
          container: { backgroundColor: toTheme("primary") },
          text: { color: toTheme("primary-foreground") },
          indicatorColor: toTheme("primary-foreground"),
        },
        link: {
          container: { backgroundColor: "transparent" },
          text: {
            color: toTheme("primary"),
          },
          indicatorColor: toTheme("primary"),
        },
      }) as Record<
        ButtonVariant,
        { container: StyleProp<ViewStyle>; text: StyleProp<TextStyle>; indicatorColor: string }
      >,
    [variant]
  )

  const { text, container, indicatorColor } = variants?.[variant] ?? variants.primary
  const { height, fontSize, borderRadius } = sizes[size] ?? sizes.md

  return (
    <Pressable
      style={(s) => [
        { height, borderRadius },
        container,
        styles.button,
        (s.pressed || isLoading || disabled) && styles.buttonLoading,
        style && typeof style === "function" ? style?.(s) : style,
      ]}
      disabled={disabled || isLoading}
      accessibilityRole="button"
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color={indicatorColor} />
      ) : (
        <Fragment>
          {icon}
          {title && <ThemedText style={[{ fontSize }, text, styles.buttonText]}>{title}</ThemedText>}
        </Fragment>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: toSpacing(4),
  },
  buttonLoading: { opacity: 0.6 },
  buttonText: { fontWeight: "semibold" },
})

export default ThemedButton
