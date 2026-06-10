import { createContext, useContext, useState, ReactNode } from "react";

export type UserProfile = {
  nickname: string;
  avatarEmoji: string;
};

type UserContextType = {
  user: UserProfile;
  updateUser: (updates: Partial<UserProfile>) => void;
};

const defaultUser: UserProfile = {
  nickname: "사용자",
  avatarEmoji: "👤",
};

function loadUser(): UserProfile {
  try {
    const raw = localStorage.getItem("smf_user_profile");
    if (raw) return { ...defaultUser, ...JSON.parse(raw) };
  } catch {}
  return defaultUser;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile>(loadUser);

  const updateUser = (updates: Partial<UserProfile>) => {
    setUser((prev) => {
      const next = { ...prev, ...updates };
      localStorage.setItem("smf_user_profile", JSON.stringify(next));
      return next;
    });
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}
