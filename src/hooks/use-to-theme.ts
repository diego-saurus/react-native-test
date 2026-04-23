import { ColorName, Colors } from "@/constants/theme"
import { useCallback } from "react"
import { useColorScheme } from "react-native"

export function useToTheme() {
  const theme = useColorScheme() ?? "light"

  const toTheme = useCallback((colorName: ColorName) => Colors[theme][colorName], [theme])

  return { toTheme, theme }
}
