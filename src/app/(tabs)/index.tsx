import PendingItemCard from "@/components/list/PendingItemCard";
import CompletedItems from "@/components/list/CompletedItems";
import ListHeroCard from "@/components/list/ListHeroCard";
import TabScreenBackground from "@/components/TabScreenBackground";
import { useGroceryStore } from "@/store/grocery-store";
import { useRouter } from "expo-router";
import { FlatList, Pressable, Text, View } from "react-native";

export default function ListScreen() {
  const router = useRouter();
  const { items, error } = useGroceryStore();
  const pendingItems = items.filter((item) => !item.purchased);

  return (
    <FlatList
      className="flex-1 bg-background"
      data={pendingItems}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PendingItemCard item={item} />}
      contentContainerStyle={{ padding: 20, gap: 14 }}
      contentInsetAdjustmentBehavior="automatic"
      ListHeaderComponent={
        <View style={{ gap: 14, paddingTop: 20 }}>
          <TabScreenBackground />
          <ListHeroCard />
          <View className="flex-row items-center justify-between px-1">
            <Text className="text-sm font-semibold uppercase tracking-[1px] text-muted-foreground">
              Shopping items
            </Text>
            <Text className="text-sm text-muted-foreground">{pendingItems.length} active</Text>
          </View>
          {error ? (
            <View className="rounded-2xl border border-destructive bg-destructive px-3 py-2">
              <Text className="text-center text-sm text-destructive-foreground">{error}</Text>
            </View>
          ) : null}
        </View>
      }
      ListEmptyComponent={
        <View className="items-center rounded-3xl border border-dashed border-border bg-card px-6 py-10">
          <Text className="text-xl font-bold text-foreground">Your list is clear</Text>
          <Text className="mt-2 text-center text-sm leading-5 text-muted-foreground">
            Add your next shop to start building a calmer grocery run.
          </Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Plan a grocery item"
            onPress={() => router.push("/(tabs)/planner")}
            style={({ pressed }) => ({
              marginTop: 18,
              borderRadius: 16,
              backgroundColor: "#237a4b",
              paddingHorizontal: 18,
              paddingVertical: 12,
              opacity: pressed ? 0.78 : 1,
            })}
          >
            <Text className="font-bold text-white">Plan an item</Text>
          </Pressable>
        </View>
      }
      ListFooterComponent={<CompletedItems />}
    />
  );
}
