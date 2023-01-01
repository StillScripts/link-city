import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import Head from "next/head";
import Link from "next/link";

import superjson from "superjson";
import { BTN_COMMON } from "../components/Actions";
import { createContext } from "../server/trpc/context";
import { appRouter } from "../server/trpc/router/_app";
import { classNames } from "../utils/common";
import { trpc } from "../utils/trpc";

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ user: string }>
) {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer: superjson,
  });
  const user = context.params?.user as string;

  /*
   * Prefetching the `post.byId` query here.
   * `prefetch` does not return the result and never throws - if you need that behavior, use `fetch` instead.
   */
  await ssg.links.getUserLinks.prefetch({ username: user });

  // Make sure to return { props: { trpcState: ssg.dehydrate() } }
  return {
    props: {
      trpcState: ssg.dehydrate(),
      user,
    },
  };
}

export default function LinksPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { user } = props;

  const userQuery = trpc.links.getUserLinks.useQuery({ username: user });

  const { data, error, isLoading } = userQuery;

  if (data) {
    return (
      <>
        <Head>
          <title>{`${data.username} Links`}</title>
          <meta name="description" content={data.about || "Explore my links"} />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            {data.username}
          </h1>
          <p className="mt-8 text-gray-300">{data.about}</p>
          <div className="mt-4 rounded bg-white bg-opacity-5 py-2 px-4">
            {data.links.map((link) => (
              <div key={link.id}>
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classNames(
                    BTN_COMMON,
                    "mb-2 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500"
                  )}
                  href={link.url}
                >
                  {link.title}
                </Link>
              </div>
            ))}
          </div>
        </main>
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <Head>
          <title>My Links | Link City</title>
          <meta
            name="description"
            content="Create your own personal links page for free."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Loading Links...
          </h1>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Error | Link City</title>
        <meta
          name="description"
          content="Create your own personal links page for free."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          An error occured
        </h1>
        {error && <p className="text-gray-300">{error.message}</p>}
        <Link
          href="/"
          className="mt-10 inline-flex items-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          Go back home
        </Link>
      </main>
    </>
  );
}
