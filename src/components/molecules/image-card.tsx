import { fontSize, radius } from "@/constants/theme"
import { blurhash } from "@/lib/expo-image"
import { PicsumImage } from "@/types/picsum"
import { toSpacing } from "@/utils/theme"
import { Image } from "expo-image"
import { Link } from "expo-router"
import React, { FC } from "react"
import { StyleSheet, TouchableOpacity } from "react-native"
import ThemedText from "../atoms/themed-text"

export interface ImageCardProps {
  item: PicsumImage
}

const ImageCard: FC<ImageCardProps> = ({ item }) => {
  return (
    <Link asChild href={`/detail/${item.id}`} style={styles.card}>
      <Link.Preview />

      <Link.Trigger>
        <TouchableOpacity activeOpacity={0.88}>
          <Image
            placeholder={{ blurhash }}
            source={{ uri: item.download_url }}
            style={styles.cardImage}
            contentFit="cover"
          />
          <ThemedText style={styles.cardName} numberOfLines={1}>
            {item.author}
          </ThemedText>
        </TouchableOpacity>
      </Link.Trigger>
    </Link>
  )
}

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
