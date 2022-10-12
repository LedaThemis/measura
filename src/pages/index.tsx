import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Hero from "../components/Home/Hero";
import Features from "../components/Home/Features";
import Contact from "../components/Home/Contact";
import Footer from "../components/Footer";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Measura - A way to keep track of body measurements</title>
        <meta
          name="description"
          content="Measura is an app used to keep track of body measurements, set goals, see how far off you're from those goals."
        />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main>
        <Navbar />
        <Hero />
        <Features />
        <Contact />
        <Footer />
      </main>
    </>
  );
};

export default Home;
