import Head from "next/head";

const Loading = () => {
  // TODO: add loading overlay
  return (
    <>
      <Head>
        <title>Loading - Measura</title>
        <meta
          name="description"
          content="Measura is an app used to keep track of body measurements, set goals, see how far off you're from those goals."
        />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className="flex w-screen justify-center"></main>
    </>
  );
};

export default Loading;
