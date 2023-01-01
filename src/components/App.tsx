import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import type { Action } from "./Actions";
import { Actions } from "./Actions";
import { Forms } from "./Forms";

export const App = () => {
  const [action, setAction] = useState<Action>("home");

  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-xl text-white">
        {sessionData ? (
          <span>Logged in as {sessionData.user?.name}.</span>
        ) : (
          <span>Log in to access your account and manage your links page.</span>
        )}
      </p>
      {sessionData ? (
        <Actions handleClick={setAction} />
      ) : (
        <button
          className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
          onClick={() => signIn()}
        >
          Sign in with Discord
        </button>
      )}
      {sessionData?.user && (
        <Forms
          action={action}
          userId={sessionData.user.id}
          returnHome={() => setAction("home")}
        />
      )}
    </div>
  );
};
