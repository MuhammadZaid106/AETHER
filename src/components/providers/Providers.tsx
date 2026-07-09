"use client";

import { SmoothScrollProvider } from "./SmoothScrollProvider";
import { ScrollToTop } from "./ScrollToTop";
import { Toaster } from "sonner";
import { CustomCursor } from "../interactive/CustomCursor";
import { useEffect } from "react";
import { useAdminProductStore } from "@/lib/store/useAdminProductStore";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Wait for Zustand persist to finish rehydrating from localStorage,
    // then seed only if the store is still empty (no user-added products).
    const unsub = useAdminProductStore.persist.onFinishHydration((state) => {
      if (!state.isInitialized || state.products.length === 0) {
        useAdminProductStore.getState().initialize();
      }
    });

    // If hydration already finished before this effect ran, check now
    if (useAdminProductStore.persist.hasHydrated()) {
      const s = useAdminProductStore.getState();
      if (!s.isInitialized || s.products.length === 0) {
        s.initialize();
      }
    }

    return unsub;
  }, []);

  return (
    <SmoothScrollProvider>
      <ScrollToTop />
      <CustomCursor />
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "var(--surface-card)",
            color: "var(--ink-900)",
            border: "1px solid var(--border-hairline)",
            fontFamily: "var(--font-sans)",
            borderRadius: "var(--radius-md)",
          },
        }}
      />
    </SmoothScrollProvider>
  );
}

