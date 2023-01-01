import { signOut } from "next-auth/react";
import type { Dispatch, SetStateAction } from "react";
import { classNames } from "../utils/common";

export const BTN_COMMON =
  "mt-2 inline-flex items-center rounded-full border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2";

export type Action = "manage-page" | "manage-links" | "home";

interface ActionProps {
  handleClick: Dispatch<SetStateAction<Action>>;
}
export const Actions: React.FC<ActionProps> = ({ handleClick }) => (
  <div className="mt-3 mb-6 flex flex-wrap space-x-3">
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
