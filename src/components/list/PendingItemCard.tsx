import { GroceryItem, useGroceryStore } from "@/store/grocery-store";
import { FontAwesome6 } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

const priorityPillBg = {
  low: "bg-priority-low",
  medium: "bg-priority-medium",
  high: "bg-priority-high",
};

const priorityPillText = {
  low: "text-priority-low-foreground",
  medium: "text-priority-medium-foreground",
  high: "text-priority-high-foreground",
};

const PendingItemCard = ({ item }: { item: GroceryItem }) => {
  const { removeItem, updateQuantity, togglePurchased } = useGroceryStore();

  return (
    <View className="rounded-3xl border border-border bg-card p-4">
      <View className="flex-row items-start gap-3">
        <Pressable
          accessibilityRole="checkbox"
          accessibilityState={{ checked: item.purchased }}
          accessibilityLabel={`Mark ${item.name} as purchased`}
          style={({ pressed }) => [styles.checkbox, pressed && styles.pressed]}
          onPress={() => void togglePurchased(item.id)}
        />

        <View className="flex-1">
          <View className="flex-row items-center justify-between gap-2">
            <Text className="flex-1 text-lg font-semibold text-card-foreground">{item.name}</Text>
            <View className={`rounded-full px-3 py-1 ${priorityPillBg[item.priority]}`}>
              <Text className={`text-xs font-bold uppercase ${priorityPillText[item.priority]}`}>
                {item.priority}
              </Text>
            </View>
          </View>

          <View className="mt-2 flex-row items-center gap-2">
            <View className="rounded-full bg-secondary px-3 py-1">
              <Text className="text-xs font-semibold text-secondary-foreground">{item.category}</Text>
            </View>
          </View>

          <View className="mt-3 flex-row items-center gap-2">
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Decrease ${item.name} quantity`}
              style={({ pressed }) => [styles.quantityButton, pressed && styles.pressed]}
              onPress={() => void updateQuantity(item.id, item.quantity - 1)}
            >
              <FontAwesome6 name="minus" size={12} color="#3b5a4a" />
            </Pressable>

            <Text className="min-w-9 text-center text-base font-semibold text-foreground">
              {item.quantity}
            </Text>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Increase ${item.name} quantity`}
              style={({ pressed }) => [styles.quantityButton, pressed && styles.pressed]}
              onPress={() => void updateQuantity(item.id, item.quantity + 1)}
            >
              <FontAwesome6 name="plus" size={12} color="#3b5a4a" />
            </Pressable>
          </View>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Delete ${item.name}`}
          style={({ pressed }) => [styles.deleteButton, pressed && styles.pressed]}
          onPress={() => void removeItem(item.id)}
        >
          <FontAwesome6 name="trash" size={13} color="#d45f58" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    width: 24,
    height: 24,
    marginTop: 4,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#b7cbbd",
    backgroundColor: "#ffffff",
  },
  quantityButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#b7cbbd",
    backgroundColor: "#eef5ef",
  },
  deleteButton: {
    width: 36,
    height: 36,
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

export default PendingItemCard;
