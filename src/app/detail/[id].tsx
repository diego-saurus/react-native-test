import { Image } from "expo-image"
import { Stack, useLocalSearchParams } from "expo-router"
import { StyleSheet, View } from "react-native"

import ThemedText from "@/components/atoms/themed-text"
import ThemedView from "@/components/atoms/themed-view"
import ImageGallery from "@/components/organisms/image-gallery"
import { fontSize } from "@/constants/theme"
import satellite from "@/lib/satellite"
import { PicsumImage } from "@/types/picsum"
import { toSpacing } from "@/utils/theme"
import { useQuery } from "@tanstack/react-query"

export default function DetailScreen() {
  const { id } = useLocalSearchParams()
  const { data } = useQuery({
    queryKey: ["images", { id }],
    queryFn: ({ signal }) => satellite<PicsumImage>("GET", `https://picsum.photos/id/${id}/info`, { signal }),
  })

  return (
    <ThemedView>
      <Stack.Screen options={{ header: () => <View /> }} />

      <ImageGallery
        maxPage={2}
        initialPageParam={40}
        header={
          <ThemedView>
            <Image source={{ uri: data?.download_url }} style={styles.image} contentFit="cover" transition={300} />

            <ThemedView style={styles.content}>
              <ThemedView style={{ gap: toSpacing(1) }}>
                <ThemedText type="title">Echoes of an Ancient Flame</ThemedText>

                <ThemedText style={{ fontSize: fontSize.xs }} type="label">
                  {data?.author}
                </ThemedText>
              </ThemedView>

              <ThemedText style={{ fontSize: fontSize.xs, lineHeight: toSpacing(4.5) }} type="description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce laoreet, est vitae dapibus pretium, enim
                ligula sagittis ipsum, eget interdum arcu mauris vitae est. Ut lobortis aliquam lectus non vulputate.
                Maecenas quis quam sed orci vulputate ullamcorper vitae ac lorem. Cras tellus orci, lacinia sit amet
                rhoncus vitae, congue blandit diam. Vivamus rhoncus sollicitudin ligula, sed scelerisque ante congue in.
                Praesent erat mi, ullamcorper in justo a, elementum gravida erat. Interdum et malesuada fames ac ante
                ipsum primis in faucibus. Etiam eleifend tempor arcu, ut commodo massa vulputate id.
              </ThemedText>

              <ThemedText style={{ fontSize: fontSize.normal }} type="title">
                More to Explore
              </ThemedText>
            </ThemedView>
          </ThemedView>
        }
      />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 600,
  },
  content: {
    padding: toSpacing(5),
    gap: toSpacing(4),
  },
})
