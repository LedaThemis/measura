import { signIn } from "next-auth/react";
import Head from "next/head";

const Login = () => {
  return (
    <>
      <Head>
        <title>Login - Measura</title>
        <meta
          name="description"
          content="You need to login to use the Measura app."
        />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className="mt-4 flex w-screen justify-center">
        <button
          className="rounded-lg bg-blue-500 p-2 text-xl text-white hover:bg-blue-600"
          onClick={() => signIn("email")}
        >
          Login with email
        </button>
      </main>
    </>
  );
};

export default Login;
