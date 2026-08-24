import { useGroceryStore } from "@/store/grocery-store";
import { FontAwesome6 } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

const CompletedItems = () => {
  const { removeItem, togglePurchased, items } = useGroceryStore();
  const completedItems = items.filter((item) => item.purchased);

  if (!completedItems.length) return null;

  return (
    <View className="mt-3 rounded-3xl border border-border bg-secondary p-4">
      <Text className="text-sm font-semibold uppercase tracking-[1px] text-secondary-foreground">
        Completed
      </Text>

      {completedItems.map((item) => (
        <View
          key={item.id}
          className="mt-3 flex-row items-center justify-between rounded-2xl border border-border bg-card px-3 py-2"
        >
          <View className="flex-row items-center gap-2">
            <Pressable
              accessibilityRole="checkbox"
              accessibilityState={{ checked: true }}
              accessibilityLabel={`Mark ${item.name} as active`}
              onPress={() => void togglePurchased(item.id)}
              style={({ pressed }) => [styles.completeButton, pressed && styles.pressed]}
            >
              <FontAwesome6 name="check" size={12} color="#ffffff" />
            </Pressable>
            <Text className="text-base text-muted-foreground line-through">{item.name}</Text>
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Delete ${item.name}`}
            onPress={() => void removeItem(item.id)}
            style={({ pressed }) => [styles.deleteButton, pressed && styles.pressed]}
          >
            <FontAwesome6 name="trash" size={12} color="#d45f58" />
          </Pressable>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  completeButton: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "#237a4b",
  },
  deleteButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "#fdeceb",
  },
  pressed: {
    opacity: 0.65,
    transform: [{ scale: 0.97 }],
  },
});

export default CompletedItems;
