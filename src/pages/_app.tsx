/// AUTHORS: AP, VD
/// LAST EDITED: 6-3-2024
/// DESCRIPTION: _app.tsx: Base structure for all interfaces in the application. Allows arbitrary component to render with Layout

import "@/styles/globals.css";

import type { NextPageWithLayout } from "@/components/layout";
import { Layout } from "@/components/layout";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";

export default function App({
  Component,
  pageProps,
}: AppProps & { Component: NextPageWithLayout }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Layout options={{ navbar: Component.navbar, footer: Component.footer }}>
        <Component {...pageProps} />;
      </Layout>
    </QueryClientProvider>
  );
}
