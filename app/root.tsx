import { cssBundleHref } from "@remix-run/css-bundle";
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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import Header from "~/components/Header";


export const links: LinksFunction = () => {
  return styles ? [
    {
      rel: "stylesheet",
      href: styles,
    },
  ] : []
};


const queryClient = new QueryClient()
export default function App() {
  return (
    <Document>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Outlet />
        </Layout>
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
        {process.env.NODE_ENV === 'development' ? <LiveReload /> : null}
      </body>
    </html>
  )
}
