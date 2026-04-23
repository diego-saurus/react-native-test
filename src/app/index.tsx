import { ThemedText } from "@/components/atoms/themed-text"
import { ThemedView } from "@/components/atoms/themed-view"
import { StyleSheet } from "react-native"

const HomeScreen = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText>Hello World</ThemedText>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})

export default HomeScreen
