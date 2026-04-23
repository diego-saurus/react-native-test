import { Image } from "expo-image"
import { Link, Stack, useLocalSearchParams } from "expo-router"
import { StyleSheet, View } from "react-native"

import ThemedButton from "@/components/atoms/themed-button"
import ThemedText from "@/components/atoms/themed-text"
import ThemedView from "@/components/atoms/themed-view"
import ChevronLeft from "@/components/icons/chevron-left"
import ImageGallery from "@/components/organisms/image-gallery"
import { fontSize } from "@/constants/theme"
import { blurhash } from "@/lib/expo-image"
import satellite from "@/lib/satellite"
import { PicsumImage } from "@/types/picsum"
import { toSpacing } from "@/utils/theme"
import { useQuery } from "@tanstack/react-query"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export default function DetailScreen() {
  const { id } = useLocalSearchParams()
  const { top, left } = useSafeAreaInsets()
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
            <Link
              href=".."
              asChild
              style={[
                styles.backButton,
                {
                  top: top + toSpacing(4),
                  left: left + toSpacing(4),
                },
              ]}
            >
              <ThemedButton icon={<ChevronLeft />} />
            </Link>
            <Image
              placeholder={{ blurhash }}
              source={{ uri: data?.download_url }}
              style={styles.image}
              contentFit="cover"
              transition={300}
            />

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
  backButton: {
    backgroundColor: "#FCFCFD",
    width: toSpacing(8),
    height: toSpacing(8),
    position: "absolute",
    zIndex: 10,
  },
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
