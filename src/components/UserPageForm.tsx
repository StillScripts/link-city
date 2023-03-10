import type { FormEvent } from "react";
import { useCallback, useState } from "react";
import { trpc } from "../utils/trpc";

interface FormValues {
  username: string;
  about: string;
}

interface UserPageFormProps {
  defaultValues: FormValues;
  userId: string;
  returnHome: () => void;
}
export const UserPageForm: React.FC<UserPageFormProps> = ({
  defaultValues,
  userId,
  returnHome,
}) => {
  const mutation = trpc.links.updateLinkPage.useMutation();

  const [form, setForm] = useState<FormValues>(defaultValues);

  const updateUserDetails = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const values = { ...form, id: userId }
      console.log(values)
      mutation.mutate(values);
    },
    [form, mutation, userId]
  );

  // useEffect(() => {
  //   if (mutation.isSuccess) {
  //     returnHome();
  //   }
  // }, [mutation.isSuccess, returnHome]);

  return (
    <form
      onSubmit={updateUserDetails}
      className="space-y-8 divide-y divide-gray-200"
    >
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div className="space-y-6 sm:space-y-5">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Your Links Page
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              This information will be used to create your links page.
            </p>
            {mutation.error && (
              <p className="text-sm text-red-500">
                An error occured: {mutation.error.message}
              </p>
            )}
          </div>

          <div className="space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Username
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <div className="flex max-w-lg rounded-md shadow-sm">
                  <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                    linkcity.com/
                  </span>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    onChange={(e) => {
                      setForm({ ...form, username: e.target.value });
                    }}
                    value={form.username}
                    className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="about"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                About
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  onChange={(e) => {
                    setForm({ ...form, about: e.target.value });
                  }}
                  value={form.about}
                  className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                />
                <p className="mt-2 text-sm text-gray-500">
                  Write a few sentences about yourself.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={returnHome}
            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={mutation.isLoading}
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-purple-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            {mutation.isLoading ? "Loading..." : "Save"}
          </button>
        </div>
      </div>
    </form>
  );
};
