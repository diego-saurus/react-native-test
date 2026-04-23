import { fontSize } from "@/constants/theme"
import { ColorName, useThemeColor } from "@/hooks/use-theme-color"
import { toSpacing } from "@/utils/theme"
import { StyleSheet, Text, TextProps } from "react-native"

export type ThemedTextProps = TextProps & {
  type?: keyof typeof styles
  colorName?: ColorName
}

const ThemedText = ({ style, colorName = "foreground", type = "default", ...rest }: ThemedTextProps) => {
  const color = useThemeColor(colorName)

  return <Text style={[{ color }, styles[type], style]} {...rest} />
}

const styles = StyleSheet.create({
  default: {
    fontSize: fontSize.normal,
    lineHeight: toSpacing(6),
  },
  defaultSemiBold: {
    fontSize: fontSize.normal,
    lineHeight: toSpacing(6),
    fontWeight: "600",
  },
  title: {
    fontSize: fontSize["2xl"],
    fontWeight: "semibold",
    lineHeight: toSpacing(8),
  },
  label: {
    fontSize: fontSize.normal,
    fontWeight: "medium",
  },
  description: {
    fontSize: fontSize.sm,
    color: "#667085",
    fontWeight: "regular",
    lineHeight: toSpacing(5),
  },
  link: {
    lineHeight: toSpacing(7.5),
    fontSize: fontSize.normal,
    color: "#0a7ea4",
  },
})

export default ThemedText
