import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import styles from "~/styles/global.css";
import Layout from "~/components/Layout";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useDehydratedState } from "use-dehydrated-state";
import { useState } from "react";
import { NotificationProvider } from "./utils/notification/NotificationContext";

export const links: LinksFunction = () => {
  return styles
    ? [
        {
          rel: "stylesheet",
          href: styles,
        },
      ]
    : [];
};

// const queryClient = new QueryClient()
export default function App() {
  const [queryClient] = useState(() => new QueryClient());
  const dehydratedState = useDehydratedState();
  return (
    <Document>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={dehydratedState}>
          <NotificationProvider>
            <Layout>
              <Outlet />
            </Layout>
          </NotificationProvider>
        </Hydrate>
      </QueryClientProvider>
    </Document>
  );
}

function Document({ children, title }: any) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <title>{title ? title : "Home page"}</title>
        <Links />
        {typeof document === "undefined" ? "__STYLES__" : null}
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" ? <LiveReload /> : null}
      </body>
    </html>
  );
}
