import type { NextPage } from "next";
import Head from "next/head";
import NewReminderButton from "../../components/pages/App/NewReminderButton";
import RemindersTable from "../../components/pages/App/RemindersTable";
import Sidebar from "../../components/pages/App/Sidebar";

const Reminders: NextPage = () => {
  return (
    <>
      <Head>
        <title>Reminders - Measura</title>
        <meta
          name="description"
          content="Show a list of your reminders in Measura."
        />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className="flex">
        <Sidebar />
        <section className="flex-grow">
          <NewReminderButton />
          <RemindersTable />
        </section>
      </main>
    </>
  );
};

export default Reminders;
