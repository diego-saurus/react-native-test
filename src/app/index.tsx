import FloatingNavbar from "@/components/molecules/floating-navbar"
import { SafeAreaView } from "react-native-safe-area-context"

const HomeScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FloatingNavbar />
    </SafeAreaView>
  )
}

export default HomeScreen
