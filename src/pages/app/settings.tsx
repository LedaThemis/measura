import type { NextPage } from "next";
import Head from "next/head";
import GoalForm from "../../components/pages/App/GoalForm";
import LogoutSection from "../../components/pages/App/LogoutSection";
import Sidebar from "../../components/pages/App/Sidebar";
const Settings: NextPage = () => {
  return (
    <>
      <Head>
        <title>Settings - Measura</title>
        <meta
          name="description"
          content="Configure preferences and select your preferred unit system in Measura."
        />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className="flex">
        <Sidebar />
        <section className="mt-10 flex flex-grow flex-col gap-4 px-8 pb-8">
          <GoalForm />
          <LogoutSection />
        </section>
      </main>
    </>
  );
};

export default Settings;
