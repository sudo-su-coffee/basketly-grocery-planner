import { Redirect, Stack } from "expo-router";

import { useSession } from "@/lib/session-context";

export default function AuthRoutesLayout() {
  const { session, isLoaded } = useSession();

  if (!isLoaded) return null;
  if (session) return <Redirect href="/" />;

  return <Stack screenOptions={{ headerShown: false }} />;
}
