"use client";

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";

export interface UserProfile {
  name: string;
  mobile: string;
  email: string;
  area: string;
  bloodGroup: string;
  language: string;
  registeredAt: string;
}

interface UserContextType {
  user: UserProfile | null;
  isRegistered: boolean;
  isModalOpen: boolean;
  pendingAction: (() => void) | null;
  openRegistration: (onComplete?: () => void) => void;
  closeModal: () => void;
  saveUser: (profile: UserProfile) => void;
  clearUser: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

const STORAGE_KEY = "km_user_profile";

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setUser(JSON.parse(stored));
    } catch {}
  }, []);

  const openRegistration = useCallback((onComplete?: () => void) => {
    setPendingAction(onComplete ? () => onComplete : null);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setPendingAction(null);
  }, []);

  const saveUser = useCallback((profile: UserProfile) => {
    const withTs = { ...profile, registeredAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(withTs));
    setUser(withTs);
    setIsModalOpen(false);
    // Execute the pending action after registration
    setPendingAction((prev) => {
      if (prev) {
        setTimeout(prev, 100);
      }
      return null;
    });
  }, []);

  const clearUser = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        isRegistered: !!user,
        isModalOpen,
        pendingAction,
        openRegistration,
        closeModal,
        saveUser,
        clearUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used inside UserProvider");
  return ctx;
}
