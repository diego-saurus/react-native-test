import ThemedView from "@/components/atoms/themed-view"
import FloatingNavbar from "@/components/molecules/floating-navbar"
import ImageGallery from "@/components/organisms/image-gallery"
import { toSpacing } from "@/utils/theme"
import React from "react"

const HomeScreen = () => {
  return (
    <ThemedView style={{ flex: 1 }}>
      <ImageGallery contentContainerStyle={{ marginTop: toSpacing(4) }} />
      <FloatingNavbar />
    </ThemedView>
  )
}

export default HomeScreen
