import { useEffect, useLayoutEffect } from "react";

/**
 * Join multiple strings to produce a single string of TailwindCSS classnames
 * @param {(string | undefined | null | false)[]} classes - The group of classes
 * @returns {string} - The single class that is generated
 */
export function classNames(
  ...classes: (string | undefined | null | false)[]
): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Provide a safe way to use the layout effect hook with SSR
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Shorten a text block so that it is within a limit
 * @param {string} original - The text that is being shortened.
 * @param {string} limit - The maximum amount of characters allowed.
 * @returns {string} - The new, shortened text.
 */
export function truncateText(original: string, limit: number): string {
  if (original.length < limit) {
    return original;
  } else {
    const shortened = original.substring(0, limit).split(" ");
    shortened.pop();
    return shortened.join(" ") + "...";
  }
}

/** Typesafe version of Object.keys */
export const getKeys = Object.keys as <T extends object>(
  obj: T
) => Array<keyof T>;
