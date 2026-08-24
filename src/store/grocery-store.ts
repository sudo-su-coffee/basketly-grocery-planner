import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

export type GroceryCategory = "Produce" | "Dairy" | "Bakery" | "Pantry" | "Snacks";
export type GroceryPriority = "low" | "medium" | "high";

export type GroceryItem = {
  id: string;
  name: string;
  category: GroceryCategory;
  quantity: number;
  purchased: boolean;
  priority: GroceryPriority;
};

export type CreateItemInput = {
  name: string;
  category: GroceryCategory;
  quantity: number;
  priority: GroceryPriority;
};

type GroceryStore = {
  items: GroceryItem[];
  isLoading: boolean;
  error: string | null;
  loadItems: () => Promise<void>;
  addItem: (input: CreateItemInput) => Promise<GroceryItem | void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  togglePurchased: (id: string) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  clearPurchased: () => Promise<void>;
};

const STORAGE_KEY = "basketly.grocery-items";
const categories: GroceryCategory[] = ["Produce", "Dairy", "Bakery", "Pantry", "Snacks"];
const priorities: GroceryPriority[] = ["low", "medium", "high"];

function isStoredItem(value: unknown): value is GroceryItem {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<GroceryItem>;
  return (
    typeof item.id === "string" &&
    typeof item.name === "string" &&
    categories.includes(item.category as GroceryCategory) &&
    typeof item.quantity === "number" &&
    item.quantity >= 1 &&
    typeof item.purchased === "boolean" &&
    priorities.includes(item.priority as GroceryPriority)
  );
}

async function persistItems(items: GroceryItem[]) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function nextId() {
  return `item-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export const useGroceryStore = create<GroceryStore>((set, get) => ({
  items: [],
  isLoading: false,
  error: null,

  loadItems: async () => {
    set({ isLoading: true, error: null });
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (!stored) {
        set({ items: [] });
        return;
      }

      const parsed: unknown = JSON.parse(stored);
      if (!Array.isArray(parsed) || !parsed.every(isStoredItem)) {
        throw new Error("Stored grocery data is invalid");
      }
      set({ items: parsed });
    } catch (error) {
      console.error("Error loading grocery items:", error);
      set({ items: [], error: "We could not read your saved list." });
    } finally {
      set({ isLoading: false });
    }
  },

  addItem: async (input) => {
    const name = input.name.trim();
    if (!name) {
      set({ error: "Give your item a name first." });
      return;
    }

    const item: GroceryItem = {
      id: nextId(),
      name,
      category: input.category,
      quantity: Math.max(1, Math.floor(input.quantity) || 1),
      purchased: false,
      priority: input.priority,
    };

    try {
      const items = [item, ...get().items];
      await persistItems(items);
      set({ items, error: null });
      return item;
    } catch (error) {
      console.error("Error adding grocery item:", error);
      set({ error: "We could not save that item." });
    }
  },

  updateQuantity: async (id, quantity) => {
    const items = get().items.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, Math.floor(quantity) || 1) } : item,
    );
    try {
      await persistItems(items);
      set({ items, error: null });
    } catch (error) {
      console.error("Error updating quantity:", error);
      set({ error: "We could not update that quantity." });
    }
  },

  togglePurchased: async (id) => {
    const items = get().items.map((item) =>
      item.id === id ? { ...item, purchased: !item.purchased } : item,
    );
    try {
      await persistItems(items);
      set({ items, error: null });
    } catch (error) {
      console.error("Error toggling grocery item:", error);
      set({ error: "We could not update that item." });
    }
  },

  removeItem: async (id) => {
    const items = get().items.filter((item) => item.id !== id);
    try {
      await persistItems(items);
      set({ items, error: null });
    } catch (error) {
      console.error("Error removing grocery item:", error);
      set({ error: "We could not remove that item." });
    }
  },

  clearPurchased: async () => {
    const items = get().items.filter((item) => !item.purchased);
    try {
      await persistItems(items);
      set({ items, error: null });
    } catch (error) {
      console.error("Error clearing purchased items:", error);
      set({ error: "We could not clear completed items." });
    }
  },
}));
