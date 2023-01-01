import type { Platform } from "@prisma/client";
import type { FormEvent } from "react";
import { useCallback, useState } from "react";
import { trpc } from "../utils/trpc";
import { PlatformAutocomplete } from "./PlatformAutocomplete";

export type LinkType = "platform" | "website";

interface FormValues {
  type: LinkType;
  title: string;
  url: string;
}

interface LinkFormProps {
  userId: string;
  returnHome: () => void;
}
export const LinkForm: React.FC<LinkFormProps> = ({ userId, returnHome }) => {
  const mutation = trpc.links.addLink.useMutation();

  const [form, setForm] = useState<FormValues>({
    type: "platform",
    title: "",
    url: "",
  });

  const [platform, setPlatform] = useState<Platform>();

  const handleToggle = () => {
    switch (form.type) {
      case "platform":
        setForm({ ...form, type: "website" });
        break;
      case "website":
        setForm({ ...form, type: "platform" });
        break;
    }
  };

  const addLink = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      mutation.mutate({
        userId,
        platformId: platform?.id,
        ...form,
      });
    },
    [form, mutation, platform?.id, userId]
  );

  return (
    <form onSubmit={addLink} className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div className="space-y-6 sm:space-y-5">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Add New Link
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              This link will be displayed on your links page.
            </p>
          </div>

          <div className="space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4">
              <div>
                <div
                  className="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700"
                  id="label-notifications"
                >
                  Link Type
                </div>
              </div>
              <div className="sm:col-span-2">
                <div className="max-w-lg">
                  <p className="text-sm text-gray-500">
                    Select the type of link you are adding
                  </p>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center">
                      <input
                        id="platform"
                        name="platform"
                        type="radio"
                        checked={form.type === "platform"}
                        onChange={handleToggle}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor="platform"
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        Social Media Platform
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="website"
                        name="website"
                        type="radio"
                        checked={form.type === "website"}
                        onChange={handleToggle}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor="website"
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        Custom Website Link
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {form.type === "website" ? (
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Title
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <input
                    id="title"
                    name="title"
                    type="text"
                    onChange={(e) => {
                      setForm({ ...form, title: e.target.value });
                    }}
                    value={form.title}
                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            ) : (
              <PlatformAutocomplete
                platform={platform}
                setPlatform={setPlatform}
              />
            )}
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="url"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Url
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <input
                  id="url"
                  name="url"
                  type="text"
                  required
                  onChange={(e) => {
                    setForm({ ...form, url: e.target.value });
                  }}
                  value={form.url}
                  className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
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
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-purple-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Add {/** Save is if edit mode */}
          </button>
        </div>
      </div>
    </form>
  );
};
