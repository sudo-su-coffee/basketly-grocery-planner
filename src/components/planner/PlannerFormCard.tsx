import { GroceryCategory, GroceryPriority, useGroceryStore } from "@/store/grocery-store";
import { FontAwesome6 } from "@expo/vector-icons";
import { useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

const categories: GroceryCategory[] = ["Produce", "Dairy", "Bakery", "Pantry", "Snacks"];
const priorities: GroceryPriority[] = ["low", "medium", "high"];

const categoryIcons: Record<GroceryCategory, keyof typeof FontAwesome6.glyphMap> = {
  Produce: "leaf",
  Dairy: "bottle-water",
  Bakery: "bread-slice",
  Pantry: "box-open",
  Snacks: "cookie-bite",
};

const priorityIcons: Record<GroceryPriority, keyof typeof FontAwesome6.glyphMap> = {
  high: "bolt",
  medium: "compass",
  low: "seedling",
};

const PlannerFormCard = () => {
  const { error, addItem } = useGroceryStore();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [category, setCategory] = useState<GroceryCategory>("Produce");
  const [priority, setPriority] = useState<GroceryPriority>("medium");
  const [isSaving, setIsSaving] = useState(false);
  const canCreate = name.trim().length > 0 && !isSaving;

  const createItem = async () => {
    if (!canCreate) return;
    setIsSaving(true);
    const created = await addItem({
      name,
      category,
      priority,
      quantity: Number(quantity) || 1,
    });
    setIsSaving(false);

    if (!created) return;
    setName("");
    setQuantity("1");
    setCategory("Produce");
    setPriority("medium");
  };

  return (
    <View className="rounded-3xl border border-border bg-card p-4">
      <Text className="text-sm font-semibold text-foreground">Item name</Text>
      <View className="mt-2 flex-row items-center rounded-2xl border border-border bg-muted px-4 py-3">
        <FontAwesome6 name="bag-shopping" size={13} color="#5b7567" />
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="e.g. Blueberries"
          className="ml-3 flex-1 text-base text-foreground"
          placeholderTextColor="#8aa397"
          returnKeyType="done"
        />
      </View>

      <Text className="mt-4 text-sm font-semibold text-foreground">Quantity</Text>
      <View className="mt-2 flex-row items-center rounded-2xl border border-border bg-muted px-4 py-3">
        <FontAwesome6 name="hashtag" size={13} color="#5b7567" />
        <TextInput
          value={quantity}
          onChangeText={(value) => setQuantity(value.replace(/[^0-9]/g, ""))}
          keyboardType="number-pad"
          placeholder="1"
          placeholderTextColor="#8aa397"
          className="ml-3 flex-1 text-base text-foreground"
          returnKeyType="done"
        />
      </View>

      <Text className="mt-4 text-sm font-semibold text-foreground">Category</Text>
      <View className="mt-2 flex-row flex-wrap gap-2">
        {categories.map((option) => {
          const active = option === category;
          return (
            <Pressable
              key={option}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              accessibilityLabel={`Category ${option}`}
              onPress={() => setCategory(option)}
              style={({ pressed }) => [
                styles.categoryButton,
                active ? styles.selectedButton : styles.unselectedButton,
                pressed && styles.pressed,
              ]}
            >
              <FontAwesome6 name={categoryIcons[option]} size={12} color={active ? "#ffffff" : "#486856"} />
              <Text
                className={`ml-2 text-sm font-semibold ${
                  active ? "text-primary-foreground" : "text-secondary-foreground"
                }`}
              >
                {option}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Text className="mt-4 text-sm font-semibold text-foreground">Priority</Text>
      <View className="mt-2 flex-row gap-2">
        {priorities.map((option) => {
          const active = option === priority;
          return (
            <Pressable
              key={option}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              accessibilityLabel={`Priority ${option}`}
              onPress={() => setPriority(option)}
              style={({ pressed }) => [
                styles.priorityButton,
                active ? styles.selectedButton : styles.unselectedButton,
                pressed && styles.pressed,
              ]}
            >
              <FontAwesome6 name={priorityIcons[option]} size={12} color={active ? "#ffffff" : "#486856"} />
              <Text
                className={`ml-2 text-sm font-semibold capitalize ${
                  active ? "text-primary-foreground" : "text-secondary-foreground"
                }`}
              >
                {option}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Add item to grocery list"
        onPress={() => void createItem()}
        disabled={!canCreate}
        style={({ pressed }) => [
          styles.addButton,
          canCreate ? styles.selectedButton : styles.disabledButton,
          pressed && styles.pressed,
        ]}
      >
        {isSaving ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <>
            <FontAwesome6 name="plus" size={14} color={canCreate ? "#ffffff" : "#7a9386"} />
            <Text className={`ml-2 text-base font-semibold ${canCreate ? "text-white" : "text-muted-foreground"}`}>
              Add to Grocery List
            </Text>
          </>
        )}
      </Pressable>

      {error ? (
        <View className="mt-3 rounded-2xl border border-destructive bg-destructive px-3 py-2">
          <Text className="text-center text-sm uppercase text-destructive-foreground">{error}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  priorityButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    paddingVertical: 10,
  },
  addButton: {
    marginTop: 20,
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
  },
  selectedButton: {
    backgroundColor: "#237a4b",
  },
  unselectedButton: {
    backgroundColor: "#dff0e4",
  },
  disabledButton: {
    backgroundColor: "#e6efe8",
  },
  pressed: {
    opacity: 0.72,
    transform: [{ scale: 0.98 }],
  },
});

export default PlannerFormCard;
