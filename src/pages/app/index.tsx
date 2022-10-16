import type { NextPage } from "next";
import Head from "next/head";
import { useRef } from "react";
import Sidebar from "../../components/pages/App/Sidebar";
import NewEntryPopup from "../../components/pages/App/NewEntryPopup";

const Home: NextPage = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);

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
        <section className="mt-10 flex flex-grow flex-col items-center">
          <button
            className="max-w-sm rounded-md bg-blue-500 px-4 py-2 text-base text-white"
            onClick={() => {
              dialogRef.current?.showModal();
            }}
          >
            New entry
          </button>
          <NewEntryPopup
            ref={dialogRef}
            closeModal={() => {
              dialogRef.current?.close();
            }}
          />
        </section>
      </main>
    </>
  );
};

export default Home;
