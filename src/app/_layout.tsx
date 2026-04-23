import { useToTheme } from "@/hooks/use-to-theme"
import { queryClient } from "@/lib/query-client"
import { QueryClientProvider } from "@tanstack/react-query"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { SafeAreaProvider } from "react-native-safe-area-context"

const RootLayout = () => {
  const { toTheme } = useToTheme()

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            headerTitleStyle: { color: toTheme("foreground"), fontWeight: "semibold" },
            headerTitleAlign: "center",
          }}
        >
          <Stack.Screen name="index" options={{ title: "Gallery Feeds" }} />
          <Stack.Screen name="add/index" options={{ title: "Add New Image", presentation: "modal" }} />
        </Stack>

        <StatusBar style="auto" />
      </SafeAreaProvider>
    </QueryClientProvider>
  )
}
export default RootLayout
