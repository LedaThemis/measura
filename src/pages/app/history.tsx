import type { NextPage } from "next";
import Head from "next/head";
import Entries from "../../components/pages/App/Entries";
import Sidebar from "../../components/pages/App/Sidebar";

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
        <div className="flex flex-grow flex-col">
          <Entries />
        </div>
      </main>
    </>
  );
};

export default History;
