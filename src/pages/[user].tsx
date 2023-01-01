import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import Head from "next/head";
import Link from "next/link";

import superjson from "superjson";
import { createContext } from "../server/trpc/context";
import { appRouter } from "../server/trpc/router/_app";
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
          <title>{data.username} Links</title>
          <meta name="description" content={data.about || "Explore my links"} />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            {data.username}
          </h1>
          <p className="mt-8 text-gray-300">{data.about}</p>
          <div>
            {data.links.map((link) => (
              <div key={link.id}>
                <Link href={link.url}>{link.title}</Link>
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
      </main>
    </>
  );
}
