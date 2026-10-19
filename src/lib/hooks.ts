"use client";

import { useSyncExternalStore } from "react";

/** false on the server and during hydration, true afterwards. Avoids hydration mismatch for persisted state. */
export function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}