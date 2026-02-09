import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/Sonner";

import "../index.css";

export type RouterAppContext = Record<string, never>;

export const Route = createRootRouteWithContext<RouterAppContext>()({
  component: RootComponent,
  head: () => ({
    meta: [
      {
        title: "dummy-products",
      },
      {
        name: "description",
        content: "dummy-products is a web application",
      },
    ],
    links: [
      {
        rel: "icon",
        href: "/favicon.ico",
      },
    ],
  }),
});

function RootComponent() {
  return (
    <>
      <HeadContent />
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        disableTransitionOnChange
        storageKey="vite-ui-theme"
      >
        <div className="min-h-svh">
          <Outlet />
        </div>
        <Toaster richColors />
      </ThemeProvider>
      {import.meta.env.DEV ? (
        <TanStackRouterDevtools position="bottom-left" />
      ) : null}
    </>
  );
}
