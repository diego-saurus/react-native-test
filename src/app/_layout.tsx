import { Tabs } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { Fragment } from "react"

const RootLayout = () => {
  return (
    <Fragment>
      <Tabs>
        <Tabs.Screen name="index" options={{ title: "Gallery Feeds" }} />
        <Tabs.Screen name="detail/[id]" options={{ href: null }} />
        <Tabs.Screen name="add/index" options={{ title: "Add New Image" }} />
      </Tabs>

      <StatusBar style="auto" />
    </Fragment>
  )
}
export default RootLayout
