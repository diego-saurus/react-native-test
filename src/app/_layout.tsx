import { useToTheme } from "@/hooks/use-to-theme"
import { Tabs } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { Fragment } from "react"

const RootLayout = () => {
  const { toTheme } = useToTheme()

  return (
    <Fragment>
      <Tabs
        screenOptions={{
          headerTitleStyle: { color: toTheme("foreground"), fontWeight: "semibold" },
        }}
      >
        <Tabs.Screen name="index" options={{ title: "Gallery Feeds" }} />
        <Tabs.Screen name="detail/[id]" options={{ href: null }} />
        <Tabs.Screen name="add/index" options={{ title: "Add New Image" }} />
      </Tabs>

      <StatusBar style="auto" />
    </Fragment>
  )
}
export default RootLayout
