import { ColorName, useThemeColor } from "@/hooks/use-theme-color"
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
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "medium",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
})

export default ThemedText
