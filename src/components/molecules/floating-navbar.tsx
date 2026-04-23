import { Link, usePathname } from "expo-router"
import React, { useState } from "react"
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { radius } from "@/constants/theme"
import { useToTheme } from "@/hooks/use-to-theme"
import { toSpacing } from "@/utils/theme"
import ThemedTextInput from "../atoms/themed-text-input"
import HouseIcon from "../icons/house"
import MagnifyingGlassIcon from "../icons/magnifying-glass"
import PlusIcon from "../icons/plus"

export default function FloatingNavbar() {
  const pathname = usePathname()
  const { toTheme } = useToTheme()

  const insets = useSafeAreaInsets()

  const [isSearchVisible, setIsSearchVisible] = useState(false)

  const toggleSearch = () => setIsSearchVisible((prev) => !prev)

  return (
    <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
      <View style={[styles.container, { paddingBottom: insets.bottom + 20 }]}>
        {isSearchVisible && (
          <View style={styles.searchInputWrapper}>
            <ThemedTextInput placeholder="Search images..." style={styles.searchInput} />
          </View>
        )}

        <View
          style={[
            styles.navbarPill,
            {
              backgroundColor: toTheme("card"),
            },
          ]}
        >
          <Link
            style={[
              styles.navItem,

              pathname === "/" && {
                backgroundColor: toTheme("background"),
              },
            ]}
            asChild
            href="/"
          >
            <Pressable>
              <HouseIcon
                color={pathname === "/" ? toTheme("muted") : undefined}
                height={toSpacing(4)}
                width={toSpacing(4)}
              />
            </Pressable>
          </Link>

          <Link
            style={[
              styles.addButton,
              {
                backgroundColor: toTheme("primary"),
                shadowColor: Platform.select({ ios: toTheme("primary") }),
              },
            ]}
            href="/add"
            asChild
          >
            <Pressable>
              <PlusIcon height={toSpacing(4)} width={toSpacing(4)} />
            </Pressable>
          </Link>

          <Pressable
            onPress={toggleSearch}
            style={[
              styles.navItem,
              isSearchVisible && {
                backgroundColor: toTheme("background"),
              },
            ]}
          >
            <MagnifyingGlassIcon
              height={toSpacing(4)}
              width={toSpacing(4)}
              color={isSearchVisible ? toTheme("muted-foreground") : undefined}
            />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  container: {
    alignItems: "center",
    width: "100%",
  },
  navbarPill: {
    flexDirection: "row",
    height: toSpacing(16),
    width: "18%",
    minWidth: toSpacing(54),
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: toSpacing(4),
  },
  navItem: {
    width: toSpacing(8),
    height: toSpacing(8),
    borderRadius: radius.lg,
    justifyContent: "center",
    alignItems: "center",
  },

  addButton: {
    width: toSpacing(12),
    height: toSpacing(12),
    borderRadius: radius.full,
    justifyContent: "center",
    alignItems: "center",

    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: radius["2xl"],
      },
    }),
  },
  searchInputWrapper: {
    width: "85%",
    marginBottom: toSpacing(3),
  },
  searchInput: {
    borderRadius: radius.full,

    ...Platform.select({
      ios: {
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
      },
    }),
  },
})
