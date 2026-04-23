import ThemedButton from "@/components/atoms/themed-button"
import { useToTheme } from "@/hooks/use-to-theme"
import { queryClient } from "@/lib/query-client"
import { QueryClientProvider } from "@tanstack/react-query"
import { Stack, useRouter } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { Button, Platform } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"

const RootLayout = () => {
  const { toTheme } = useToTheme()
  const { back } = useRouter()

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            headerTitleStyle: { color: toTheme("foreground"), fontWeight: "semibold" },
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: toTheme("card") },
          }}
        >
          <Stack.Screen name="index" options={{ title: "Gallery Feeds" }} />
          <Stack.Screen
            name="add/index"
            options={{
              title: "Add New Image",
              presentation: "modal",
              headerLeft: () =>
                Platform.select({
                  ios: <Button title="Cancel" onPress={back} />,
                  android: <ThemedButton variant="link" onPress={back} title="Cancel" />,
                }),
            }}
          />
        </Stack>

        <StatusBar style="auto" />
      </SafeAreaProvider>
    </QueryClientProvider>
  )
}
export default RootLayout
