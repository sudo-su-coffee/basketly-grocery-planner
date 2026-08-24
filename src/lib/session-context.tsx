import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type Session = {
  name: string;
  email: string;
};

type SessionContextValue = {
  session: Session | null;
  isLoaded: boolean;
  signIn: (name?: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const SESSION_KEY = "basketly.session";
const DEFAULT_SESSION: Session = {
  name: "Basketly shopper",
  email: "local@basketly.app",
};

const SessionContext = createContext<SessionContextValue | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(SESSION_KEY)
      .then((stored) => {
        if (stored) setSession(JSON.parse(stored) as Session);
      })
      .catch(() => undefined)
      .finally(() => setIsLoaded(true));
  }, []);

  const value = useMemo<SessionContextValue>(
    () => ({
      session,
      isLoaded,
      signIn: async (name = DEFAULT_SESSION.name) => {
        const nextSession = {
          ...DEFAULT_SESSION,
          name: name.trim() || DEFAULT_SESSION.name,
        };
        setSession(nextSession);
        await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(nextSession));
      },
      signOut: async () => {
        setSession(null);
        await AsyncStorage.removeItem(SESSION_KEY);
      },
    }),
    [isLoaded, session],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) throw new Error("useSession must be used inside SessionProvider");
  return context;
}
