import ThemedView from "@/components/atoms/themed-view"
import ImageCard from "@/components/molecules/image-card"
import ImageCardSkeleton from "@/components/molecules/image-card-skeleton"
import satellite from "@/lib/satellite"
import { PicsumImage } from "@/types/picsum"
import { toSpacing } from "@/utils/theme"
import { useInfiniteQuery } from "@tanstack/react-query"
import React, { ComponentType, FC, JSXElementConstructor, ReactElement, useMemo } from "react"
import { Dimensions, FlatList, StyleProp, StyleSheet, ViewStyle } from "react-native"

const { width: SCREEN_WIDTH } = Dimensions.get("window")
const numColumns = SCREEN_WIDTH > 600 ? 3 : 2

interface ImageGalleryProps {
  maxPage?: number
  header?: ReactElement<unknown, string | JSXElementConstructor<any>> | ComponentType<any> | null | undefined
  initialPageParam?: number
  contentContainerStyle?: StyleProp<ViewStyle>
  search?: string
}

const ImageGallery: FC<ImageGalleryProps> = ({
  maxPage = 10,
  header,
  initialPageParam = 1,
  contentContainerStyle,
  search,
}) => {
  const { data, fetchNextPage, hasNextPage, refetch, isRefetching, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["images", { maxPage, initialPageParam }],
    queryFn: ({ pageParam, signal }) =>
      satellite<PicsumImage[]>("GET", "https://picsum.photos/v2/list", {
        signal,
        params: { page: pageParam, limit: 10 },
      }),
    initialPageParam,
    getNextPageParam: (_lastPage, _allPage, lastParam) => {
      const nextParam = lastParam + 1
      if (nextParam > maxPage) return undefined
      return nextParam
    },
  })

  const flattenData = useMemo(() => {
    const images = data?.pages.flatMap((page) => page)
    if (search) return images?.filter((image) => image.author.toLowerCase().startsWith(search.toLowerCase()))

    return images
  }, [data, search])

  const renderItem = ({ item }: { item: PicsumImage }) => <ImageCard item={item} />
  return (
    <FlatList
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={[styles.listContent, contentContainerStyle]}
      data={flattenData}
      refreshing={isRefetching}
      renderItem={renderItem}
      onRefresh={() => refetch()}
      onEndReached={() => fetchNextPage()}
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
      onEndReachedThreshold={1}
      ListHeaderComponent={header}
      ListFooterComponent={
        isFetchingNextPage ? (
          <ThemedView style={styles.footerContainer}>
            {Array.from({ length: numColumns }).map((_, id) => (
              <ImageCardSkeleton key={id} />
            ))}
          </ThemedView>
        ) : null
      }
    />
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },

  listContent: {
    gap: toSpacing(3),
    paddingBottom: toSpacing(32),
  },
  columnWrapper: {
    paddingHorizontal: toSpacing(3),
    gap: toSpacing(3),
  },
  footerContainer: {
    paddingHorizontal: toSpacing(3),
    flexDirection: "row",
    justifyContent: "space-between",
    gap: toSpacing(3),
    marginTop: toSpacing(3),
    paddingBottom: toSpacing(10),
  },
})

export default ImageGallery
