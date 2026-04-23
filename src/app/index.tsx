import FloatingNavbar from "@/components/molecules/floating-navbar"
import ImageGallery from "@/components/organisms/image-gallery"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"

const HomeScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageGallery />
      <FloatingNavbar />
    </SafeAreaView>
  )
}

export default HomeScreen
