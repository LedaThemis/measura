import { SessionProvider, useSession } from "next-auth/react";
import Loading from "./Loading";
import Login from "./Login";

interface AuthenticatedComponentProps {
  children: React.ReactNode;
}

const AuthenticatedComponent = ({ children }: AuthenticatedComponentProps) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "unauthenticated") {
    return <Login />;
  }

  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default AuthenticatedComponent;
