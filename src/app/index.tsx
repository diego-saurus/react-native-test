import ThemedView from "@/components/atoms/themed-view"
import FloatingNavbar from "@/components/molecules/floating-navbar"
import ImageGallery from "@/components/organisms/image-gallery"
import { useDebounceValue } from "@/hooks/use-debounce"
import { toSpacing } from "@/utils/theme"
import React, { useState } from "react"

const HomeScreen = () => {
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounceValue(search)

  return (
    <ThemedView style={{ flex: 1 }}>
      <ImageGallery search={debouncedSearch} contentContainerStyle={{ marginTop: toSpacing(4) }} />
      <FloatingNavbar search={search} onSearchChange={setSearch} />
    </ThemedView>
  )
}

export default HomeScreen
