import { Redirect } from "expo-router";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import { useEffect } from "react";

import { useSession } from "@/lib/session-context";
import { useGroceryStore } from "@/store/grocery-store";

export default function TabsLayout() {
  const { session, isLoaded } = useSession();
  const { loadItems, isLoading } = useGroceryStore();

  useEffect(() => {
    if (session) void loadItems();
  }, [loadItems, session]);

  if (!isLoaded || (session && isLoading)) return null;
  if (!session) return <Redirect href="/(auth)/sign-in" />;

  return (
    <NativeTabs tintColor="#237a4b">
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>List</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: "list.bullet.clipboard", selected: "list.bullet.clipboard.fill" }}
          md="list"
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="planner">
        <NativeTabs.Trigger.Icon sf={{ default: "plus.circle", selected: "plus.circle.fill" }} md="add" />
        <NativeTabs.Trigger.Label>Plan</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="insights">
        <NativeTabs.Trigger.Icon sf={{ default: "chart.bar", selected: "chart.bar.fill" }} md="analytics" />
        <NativeTabs.Trigger.Label>Insights</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
