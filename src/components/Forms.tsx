import Link from "next/link";
import { trpc } from "../utils/trpc";
import type { Action } from "./Actions";
import { LinkForm } from "./LinkForm";
import { UserPageForm } from "./UserPageForm";

interface FormsProps {
  action: Action;
  userId: string;
  returnHome: () => void;
}

export const Forms: React.FC<FormsProps> = ({ action, userId, returnHome }) => {
  const { data, error, isLoading } = trpc.auth.getUser.useQuery({ id: userId });
  if (data) {
    return (
      <div>
        {data.username && (
          <p className="mb-5 text-white text-center">
            View your{" "}
            <Link
              href={`/${data.username}`}
              className="text-purple-400 underline hover:text-purple-300"
            >
              links page
            </Link>
          </p>
        )}

        {action === "manage-page" && (
          <div className="rounded-xl bg-white bg-opacity-90 p-4">
            <UserPageForm
              defaultValues={{
                username: data.username || "",
                about: data.about || "",
              }}
              userId={userId}
              returnHome={returnHome}
            />
          </div>
        )}
        {action === "manage-links" && (
          <div className="rounded-xl bg-white bg-opacity-90 p-4">
            <LinkForm />
          </div>
        )}
      </div>
    );
  }
  if (isLoading) {
    return <p className="text-white">Loading your details...</p>;
  }
  return (
    <div className="text-center text-white">
      <p>An error occured</p>
      <p>{error?.message}</p>
    </div>
  );
};
