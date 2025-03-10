"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { createClient } from "../utils/supabase/client";
import { login } from "../app/signup/actions";
import { getRowById } from "../utils/apis/api";

// Define user context type
interface UserContextType {
  user: User | null;
  setUser?: React.Dispatch<React.SetStateAction<any>>;
  profile: {
    id: string;
    name: string;
    created_at: Date;
    avatar_url: string;
    email: string;
  } | null;
  setProfile?: React.Dispatch<React.SetStateAction<any>>;
  fetchUser?: Function;
  isLoading: boolean;
  logout?: () => void;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: true,
  profile: null,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const supabase = createClient();

  // Fetch user on initial load
  const fetchUser = async () => {
    await logout();
    const { data } = await supabase.auth.getUser();
    console.log("user in context: ", data?.user);
    setUser(data?.user);
    setIsLoading(false);

    if (data?.user) {
      const profileData = await getRowById("users", data.user.id);
      console.log("profile in context: ", profileData[0]);
      setProfile(profileData[0]);
    }
  };

  useEffect(() => {
    fetchUser();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        logout,
        profile,
        setProfile,
        fetchUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider"); // ✅ Prevents undefined errors
  }
  return context;
};
