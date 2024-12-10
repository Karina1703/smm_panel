"use client";

import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";

export function Providers({ children, session }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={"dark"}
      forcedTheme={"dark"}
      enableSystem={false}
    >
      <SessionProvider session={session}>{children}</SessionProvider>
    </ThemeProvider>
  );
}
