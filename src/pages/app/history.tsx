import type { NextPage } from "next";
import Head from "next/head";
import Sidebar from "../../components/App/SidebarNav";

const History: NextPage = () => {
  return (
    <>
      <Head>
        <title>History - Measura</title>
        <meta name="description" content="See your past entries in Measura." />
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

export default History;
