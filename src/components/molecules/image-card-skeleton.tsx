import { fontSize, radius } from "@/constants/theme"
import { toSpacing } from "@/utils/theme"
import React, { useEffect, useRef } from "react"
import { Animated, StyleSheet, View } from "react-native"

const ImageCardSkeleton = () => {
  const opacity = useRef(new Animated.Value(0.3)).current

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start()
  }, [opacity])

  return (
    <View style={styles.card}>
      <Animated.View style={[styles.cardImage, { opacity }]} />
      <Animated.View style={[styles.cardName, { opacity }]} />
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1 / 2,
  },
  cardImage: {
    width: "100%",
    aspectRatio: 3 / 4,
    borderRadius: radius["2xl"],
    backgroundColor: "#E5E7EB",
  },
  cardName: {
    marginTop: toSpacing(1.5),
    height: fontSize.sm,
    width: "60%",
    backgroundColor: "#E5E7EB",
    borderRadius: radius.sm,
  },
})

export default ImageCardSkeleton
