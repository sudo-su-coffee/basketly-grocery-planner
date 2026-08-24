import { KeyboardProvider } from "react-native-keyboard-controller";
import { Stack } from "expo-router";

import "../../global.css";
import { SessionProvider } from "@/lib/session-context";

export default function RootLayout() {
  return (
    <SessionProvider>
      <KeyboardProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </KeyboardProvider>
    </SessionProvider>
  );
}
