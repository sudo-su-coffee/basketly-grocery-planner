import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useSession } from "@/lib/session-context";

export default function SignInScreen() {
  const router = useRouter();
  const { signIn } = useSession();
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const enterBasketly = async () => {
    setIsSubmitting(true);
    await signIn(name);
    router.replace("/");
  };

  return (
    <SafeAreaView className="flex-1 bg-primary" edges={["top", "bottom"]}>
      <View className="flex-1 justify-between px-6 pb-8 pt-16">
        <View>
          <View className="mb-8 h-16 w-16 items-center justify-center rounded-3xl bg-white/20">
            <View className="h-7 w-9 rounded-b-xl border-4 border-white" />
          </View>
          <Text className="text-5xl font-extrabold tracking-tight text-white">Basketly</Text>
          <Text className="mt-3 max-w-sm text-lg leading-7 text-white/80">
            A calmer way to plan the shop, keep your list tidy, and waste less.
          </Text>
        </View>

        <View className="rounded-[30px] bg-card px-5 pb-5 pt-6">
          <Text className="text-2xl font-bold text-card-foreground">Start with your name</Text>
          <Text className="mt-2 text-base leading-6 text-muted-foreground">
            Basketly stores your list on this device. No account or setup is required for the starter app.
          </Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Your name (optional)"
            placeholderTextColor="#6f8679"
            autoCapitalize="words"
            returnKeyType="done"
            className="mt-5 rounded-2xl border border-border bg-muted px-4 py-4 text-base text-foreground"
          />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Enter Basketly"
            disabled={isSubmitting}
            onPress={enterBasketly}
            style={({ pressed }) => ({
              marginTop: 12,
              minHeight: 56,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 18,
              backgroundColor: "#237a4b",
              opacity: pressed || isSubmitting ? 0.78 : 1,
            })}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text className="text-base font-bold text-white">Open my list</Text>
            )}
          </Pressable>
          <Text className="mt-4 text-center text-xs leading-5 text-muted-foreground">
            You can connect a hosted account and database later without changing the list experience.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
