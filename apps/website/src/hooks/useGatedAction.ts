"use client";

import { useCallback } from "react";
import { useUser } from "@/context/UserContext";

/**
 * Returns a wrapper that gates any action behind registration.
 * If user is registered, runs the action immediately.
 * If not, opens the registration modal; the action runs after successful registration.
 */
export function useGatedAction() {
  const { isRegistered, openRegistration } = useUser();

  const gate = useCallback(
    (action: () => void) => {
      if (isRegistered) {
        action();
      } else {
        openRegistration(action);
      }
    },
    [isRegistered, openRegistration]
  );

  return gate;
}
