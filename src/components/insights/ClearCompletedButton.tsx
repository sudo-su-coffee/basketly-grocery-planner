import { useGroceryStore } from "@/store/grocery-store";
import { Pressable, StyleSheet, Text } from "react-native";

export default function ClearCompletedButton() {
  const { clearPurchased, items } = useGroceryStore();
  const hasCompleted = items.some((item) => item.purchased);

  if (!hasCompleted) return null;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Clear completed items"
      onPress={() => void clearPurchased()}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Text className="text-center text-base font-semibold text-primary-foreground">
        Clear completed items
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    backgroundColor: "#237a4b",
    paddingVertical: 12,
  },
  pressed: {
    opacity: 0.72,
  },
});
