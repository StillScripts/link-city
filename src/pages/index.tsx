import { type NextPage } from "next";
import Head from "next/head";
//import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import { AddNewLinkButton } from "../components/AddNewLinkButton";
import { UserPageForm } from "../components/UserPageForm";
import { LinkForm } from "../components/LinkForm";

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

const App = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData ? (
          <span>Logged in as {sessionData.user?.name}</span>
        ) : (
          <span>Log in to access your account and manage your links page.</span>
        )}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in with Discord"}
      </button>
      {secretMessage && (
        <>
          <div className="rounded-xl bg-white bg-opacity-90 p-4">
            <span>
              <AddNewLinkButton />
            </span>
          </div>
          <div className="rounded-xl bg-white bg-opacity-90 p-4">
            <UserPageForm />
          </div>
          <div className="rounded-xl bg-white bg-opacity-90 p-4">
            <LinkForm />
          </div>
        </>
      )}
    </div>
  );
};
