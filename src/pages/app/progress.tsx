import type { NextPage } from "next";
import Head from "next/head";
import Sidebar from "../../components/pages/App/Sidebar";
import Charts from "../../components/pages/App/Charts";

const Progress: NextPage = () => {
  return (
    <>
      <Head>
        <title>Progress - Measura</title>
        <meta
          name="description"
          content="View your progress as a nicely-drawn graph in Measura."
        />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className="flex">
        <Sidebar />
        <section className="mx-4 mt-10 flex flex-grow flex-col pb-8">
          <header>
            <h2 className="text-2xl">Progress</h2>
          </header>
          <Charts />
        </section>
      </main>
    </>
  );
};

export default Progress;
