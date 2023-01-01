import { type NextPage } from "next";
import Head from "next/head";
import { App } from "../components/App";

const Home: NextPage = () => {
  //const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

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
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Link <span className="text-[hsl(280,100%,70%)]">City</span>
          </h1>
          <div className="flex flex-col items-center gap-2">
            <App />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
