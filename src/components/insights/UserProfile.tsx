import { FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { useSession } from "@/lib/session-context";

const UserProfile = () => {
  const router = useRouter();
  const { session, signOut } = useSession();

  if (!session) return null;

  const handleSignOut = async () => {
    await signOut();
    router.replace("/(auth)/sign-in");
  };

  return (
    <View className="rounded-3xl border border-border bg-card p-4">
      <View className="flex-row items-center gap-3">
        <View className="h-12 w-12 items-center justify-center rounded-full bg-secondary">
          <Text className="text-xl font-bold text-secondary-foreground">
            {session.name.charAt(0).toUpperCase()}
          </Text>
        </View>
        <View className="flex-1">
          <Text className="text-xs uppercase tracking-[1px] text-muted-foreground">Local profile</Text>
          <Text className="mt-1 text-lg font-bold text-foreground">{session.name}</Text>
          <Text className="text-sm text-muted-foreground">Saved on this device</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Sign out"
          onPress={handleSignOut}
          style={({ pressed }) => ({
            height: 36,
            width: 36,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 12,
            backgroundColor: "#fdeceb",
            opacity: pressed ? 0.65 : 1,
          })}
        >
          <FontAwesome6 name="right-from-bracket" size={13} color="#d45f58" />
        </Pressable>
      </View>
    </View>
  );
};

export default UserProfile;
