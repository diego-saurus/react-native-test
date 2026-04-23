import { type ColorName } from "@/constants/theme"
import { useToTheme } from "./use-to-theme"

export function useThemeColor(colorName: ColorName, option?: { light?: string; dark?: string }) {
  const { theme, toTheme } = useToTheme()
  const colorFromOption = option?.[theme]

  return colorFromOption ?? toTheme(colorName)
}
export { ColorName }
