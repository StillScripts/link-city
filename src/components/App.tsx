import { signIn, signOut, useSession } from "next-auth/react";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { classNames } from "../utils/common";
import { trpc } from "../utils/trpc";
import { AddNewLinkButton } from "./AddNewLinkButton";
import { LinkForm } from "./LinkForm";
import { UserPageForm } from "./UserPageForm";

const BTN_COMMON =
  "mt-2 inline-flex items-center rounded-full border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2";

type Action = "manage-page" | "manage-links" | "home";

interface ActionProps {
  handleClick: Dispatch<SetStateAction<Action>>;
}
const Actions: React.FC<ActionProps> = ({ handleClick }) => (
  <div className="mt-3 mb-6 flex flex-wrap space-x-2">
    <button
      type="button"
      onClick={() => handleClick("manage-page")}
      className={classNames(
        BTN_COMMON,
        "ml-2 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500"
      )}
    >
      Manage Your Page
    </button>
    <button
      type="button"
      onClick={() => handleClick("manage-links")}
      className={classNames(
        BTN_COMMON,
        "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
      )}
    >
      Manage Your Links
    </button>
    <button
      type="button"
      onClick={() => signOut()}
      className={classNames(
        BTN_COMMON,
        "bg-gray-600 hover:bg-gray-700 focus:ring-gray-500"
      )}
    >
      Sign Out
    </button>
  </div>
);

export const App = () => {
  const [action, setAction] = useState<Action>("home");

  const { data: sessionData } = useSession();

  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-white">{action}</p>
      <p className="text-center text-xl text-white">
        {sessionData ? (
          <span>Logged in as {sessionData.user?.name}</span>
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
      {sessionData && (
        <>
          {/* <div className="rounded-xl bg-white bg-opacity-90 p-4">
            <span>
              <AddNewLinkButton />
            </span>
          </div> */}
          {action === "manage-page" && (
            <div className="rounded-xl bg-white bg-opacity-90 p-4">
              <UserPageForm />
            </div>
          )}
          {action === "manage-links" && (
            <div className="rounded-xl bg-white bg-opacity-90 p-4">
              <LinkForm />
            </div>
          )}
        </>
      )}
    </div>
  );
};
