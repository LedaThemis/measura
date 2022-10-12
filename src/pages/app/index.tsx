import type { NextPage } from "next";
import Head from "next/head";
import Sidebar from "../../components/App/SidebarNav";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard - Measura</title>
        <meta
          name="description"
          content="Measura is an app used to keep track of body measurements, set goals, see how far off you're from those goals."
        />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className="flex">
        <Sidebar />
        <section className="mt-10 flex flex-grow justify-center">
          <h2 className="text-4xl font-bold text-gray-600">Coming soon</h2>
        </section>
      </main>
    </>
  );
};

export default Home;
