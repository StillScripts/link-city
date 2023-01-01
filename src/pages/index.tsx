import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { App } from "../components/App";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Link City</title>
        <meta
          name="description"
          content="Create your own personal links page for free."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-2 px-4 py-16 ">
          <div className="w-80">
          <Image
          className="aspect-video"
            src="/LinkCity.png"
            alt="Link City logo"
            height={540}
            width={960}
            quality={90}
          />
          </div>
          <div className="flex flex-col items-center gap-2">
            <App />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
