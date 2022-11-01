import Head from "next/head";
import SignInGithubButton from "../../buttons/SignInGithubButton";
import SignInGoogleButton from "../../buttons/SignInGoogleButton";
import Footer from "../../Footer";
import LoginEmailForm from "./LoginEmailForm";

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
      <main className="flex min-h-screen flex-col justify-between">
        <div className="mx-auto mt-12 flex max-w-[300px] flex-col gap-12 text-center">
          <h1 className="text-4xl font-bold">Log in to Measura</h1>
          <div className="flex flex-col gap-3">
            <SignInGithubButton />
            <SignInGoogleButton />
            <LoginEmailForm />
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Login;
