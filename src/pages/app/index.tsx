import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Measura</title>
        <meta
          name="description"
          content="Measura is an app used to keep track of body measurements, set goals, see how far off you're from those goals."
        />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main>App</main>
    </>
  );
};

export default Home;
