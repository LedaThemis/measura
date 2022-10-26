import type { NextPage } from "next";
import Head from "next/head";
import Sidebar from "../../components/pages/App/Sidebar";
import DashboardProgress from "../../components/pages/App/DashboardProgress";
import NewEntryButton from "../../components/pages/App/NewEntryButton";

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
        <div className="flex-grow">
          <NewEntryButton />
          <DashboardProgress />
        </div>
      </main>
    </>
  );
};

export default Home;
