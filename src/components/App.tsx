import { signIn } from "next-auth/react";
import { useState } from "react";
import { trpc } from "../utils/trpc";
import type { Action } from "./Actions";
import { Actions } from "./Actions";
import { Forms } from "./Forms";

export const App = () => {
  const [action, setAction] = useState<Action>("home");

  const { data, isLoading } = trpc.auth.getSession.useQuery();

  if (isLoading) {
    return <p className="text-center text-xl text-white">Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="mb-2 text-center text-xl text-white">
        {data ? (
          <span>
            Logged in as{" "}
            <span className="text-[hsl(280,100%,70%)]">{data.user?.name}</span>.
          </span>
        ) : (
          <span>Log in to access your account and manage your links page.</span>
        )}
      </p>
      {data ? (
        <Actions handleClick={setAction} />
      ) : (
        <button
          className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
          onClick={() => signIn()}
        >
          Sign in with Discord
        </button>
      )}
      {data?.user && (
        <Forms
          action={action}
          userId={data.user.id}
          returnHome={() => setAction("home")}
        />
      )}
    </div>
  );
};
