import { fontSize, radius } from "@/constants/theme"
import { blurhash } from "@/lib/expo-image"
import { PicsumImage } from "@/types/picsum"
import { toSpacing } from "@/utils/theme"
import { Image } from "expo-image"
import React, { FC } from "react"
import { StyleSheet, TouchableOpacity } from "react-native"
import ThemedText from "../atoms/themed-text"

export interface ImageCardProps {
  item: PicsumImage
}

const ImageCard: FC<ImageCardProps> = ({ item }) => (
  <TouchableOpacity activeOpacity={0.88} style={styles.card}>
    <Image placeholder={{ blurhash }} source={{ uri: item.download_url }} style={styles.cardImage} contentFit="cover" />
    <ThemedText style={styles.cardName} numberOfLines={1}>
      {item.author}
    </ThemedText>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  card: {
    flex: 1 / 2,
  },
  cardImage: {
    width: "100%",
    aspectRatio: 3 / 4,
    borderRadius: radius["2xl"],
  },
  cardName: {
    marginTop: toSpacing(1.5),
    fontSize: fontSize.sm,
  },

  row: {
    justifyContent: "space-between",
  },

  listContent: {
    paddingBottom: toSpacing(28),
  },
})

export default ImageCard
