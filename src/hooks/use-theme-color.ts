import { Colors } from "@/constants/theme";
import { useColorScheme } from "react-native";

export function useThemeColor(
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
  option?: { light?: string; dark?: string },
) {
  const theme = useColorScheme() ?? "light";
  const colorFromOption = option?.[theme];

  return colorFromOption ?? Colors[theme][colorName];
}
