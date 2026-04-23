import React, { useState } from "react"
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"

// ─── Constants ────────────────────────────────────────────────────────────────

const { width: SCREEN_WIDTH } = Dimensions.get("window")
const COLUMN_GAP = 12
const H_PADDING = 16
const CARD_WIDTH = (SCREEN_WIDTH - H_PADDING * 2 - COLUMN_GAP) / 2

// ─── Data ─────────────────────────────────────────────────────────────────────

interface GalleryItem {
  id: string
  photographer: string
  imageUrl: string
}

const GALLERY_DATA: GalleryItem[] = [
  {
    id: "1",
    photographer: "Alejandro Escamilla",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
  },
  {
    id: "2",
    photographer: "Pablo Di Canio",
    imageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80",
  },
  {
    id: "3",
    photographer: "Marcus Horison",
    imageUrl: "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?w=400&q=80",
  },
  {
    id: "4",
    photographer: "Celine Huang",
    imageUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&q=80",
  },
  {
    id: "5",
    photographer: "Jennifer Chen",
    imageUrl: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=400&q=80",
  },
  {
    id: "6",
    photographer: "Roberto De Zerbi",
    imageUrl: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=400&q=80",
  },
  {
    id: "7",
    photographer: "Stefan Jovetic",
    imageUrl: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=400&q=80",
  },
  {
    id: "8",
    photographer: "Dean Thompson",
    imageUrl: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&q=80",
  },
  {
    id: "9",
    photographer: "Frank Ashlar",
    imageUrl: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=400&q=80",
  },
  {
    id: "10",
    photographer: "Jarred Shaw",
    imageUrl: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=400&q=80",
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

const GalleryCard = ({ item }: { item: GalleryItem }) => (
  <TouchableOpacity activeOpacity={0.88} style={styles.card}>
    <Image source={{ uri: item.imageUrl }} style={styles.cardImage} resizeMode="cover" />
    <Text style={styles.cardName} numberOfLines={1}>
      {item.photographer}
    </Text>
  </TouchableOpacity>
)

// ─── Bottom Nav ───────────────────────────────────────────────────────────────

type NavTab = "home" | "add" | "search"

const BottomNav = ({ active, onPress }: { active: NavTab; onPress: (tab: NavTab) => void }) => (
  <View style={styles.navBar}>
    {/* Home */}
    <TouchableOpacity
      style={[styles.navBtn, active === "home" && styles.navBtnActive]}
      onPress={() => onPress("home")}
      activeOpacity={0.7}
      accessibilityLabel="Home"
    >
      <HomeIcon active={active === "home"} />
    </TouchableOpacity>

    {/* Add — FAB style */}
    <TouchableOpacity style={styles.navFab} onPress={() => onPress("add")} activeOpacity={0.8} accessibilityLabel="Add">
      <Text style={styles.navFabIcon}>＋</Text>
    </TouchableOpacity>

    {/* Search */}
    <TouchableOpacity
      style={[styles.navBtn, active === "search" && styles.navBtnActive]}
      onPress={() => onPress("search")}
      activeOpacity={0.7}
      accessibilityLabel="Search"
    >
      <SearchIcon active={active === "search"} />
    </TouchableOpacity>
  </View>
)

// ─── Icon helpers (no external deps) ─────────────────────────────────────────

function HomeIcon({ active }: { active: boolean }) {
  const color = active ? "#3B82F6" : "#9CA3AF"
  return (
    <View style={{ alignItems: "center", justifyContent: "center", width: 22, height: 22 }}>
      {/* roof */}
      <View
        style={{
          width: 0,
          height: 0,
          borderLeftWidth: 11,
          borderRightWidth: 11,
          borderBottomWidth: 9,
          borderLeftColor: "transparent",
          borderRightColor: "transparent",
          borderBottomColor: color,
          marginBottom: -1,
        }}
      />
      {/* body */}
      <View
        style={{
          width: 14,
          height: 10,
          backgroundColor: color,
          borderBottomLeftRadius: 2,
          borderBottomRightRadius: 2,
        }}
      />
    </View>
  )
}

function SearchIcon({ active }: { active: boolean }) {
  const color = active ? "#3B82F6" : "#9CA3AF"
  return (
    <View style={{ width: 22, height: 22, justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          width: 13,
          height: 13,
          borderRadius: 7,
          borderWidth: 2,
          borderColor: color,
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: 2,
          right: 2,
          width: 6,
          height: 2,
          backgroundColor: color,
          borderRadius: 1,
          transform: [{ rotate: "45deg" }],
        }}
      />
    </View>
  )
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function GalleryFeedsScreen() {
  const [activeTab, setActiveTab] = useState<NavTab>("home")

  const renderItem = ({ item }: { item: GalleryItem }) => <GalleryCard item={item} />

  const renderHeader = () => <Text style={styles.heading}>Gallery Feeds</Text>

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FB" />

      <FlatList
        data={GALLERY_DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListHeaderComponent={renderHeader}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <BottomNav active={activeTab} onPress={setActiveTab} />
    </SafeAreaView>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F8F9FB",
  },

  // ── List ──
  listContent: {
    paddingHorizontal: H_PADDING,
    paddingBottom: 100,
  },
  heading: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
    paddingVertical: 20,
    letterSpacing: 0.2,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: COLUMN_GAP,
  },

  // ── Card ──
  card: {
    width: CARD_WIDTH,
  },
  cardImage: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 0.85,
    borderRadius: 14,
    backgroundColor: "#E5E7EB",
  },
  cardName: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: "500",
    color: "#374151",
    letterSpacing: 0.1,
  },

  // ── Bottom Nav ──
  navBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: Platform.OS === "ios" ? 88 : 70,
    paddingBottom: Platform.OS === "ios" ? 20 : 8,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 10,
  },
  navBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  navBtnActive: {
    backgroundColor: "#EFF6FF",
  },
  navFab: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  navFabIcon: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "300",
    lineHeight: 28,
    marginTop: -2,
  },
})
