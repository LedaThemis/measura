// src/pages/_app.tsx
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import type { AppType } from "next/app";
import { trpc } from "../utils/trpc";
import { useRouter } from "next/router";
import AuthenticatedComponent from "../components/pages/App/AuthenticatedComponent";
import { Toaster } from "react-hot-toast";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter();

  // Route is authenticated if it is inside /app
  if (router.pathname.startsWith("/app")) {
    return (
      <SessionProvider session={session}>
        <AuthenticatedComponent>
          <Component {...pageProps} />
          <Toaster />
        </AuthenticatedComponent>
      </SessionProvider>
    );
  }

  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
