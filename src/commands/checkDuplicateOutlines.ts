"use strict";

import fs from "node:fs/promises";

import standardDictionarySet from "../consts/standardDictionarySet.json";
import standardDictionariesDir from "../consts/standardDictionariesDir";
import zipDictNameAndContents from "../utils/zipDictNameAndContents";
import type { StenoDictionary } from "src/shared/types";

/**
 * This command checks for duplicate outlines in the standard Typey Type dictionaries.
 *
 * - It reads all of the outlines in all of the dictionaries
 * - It gathers up duplicate outlines
 * - It shows results as an outline and which dictionaries it appears in
 */
const run = async () => {
  console.log("Checking duplicate outlines…");

  const standardDicts: StenoDictionary[] = await Promise.all(
    standardDictionarySet
      .filter((name) => name !== "top-10000-project-gutenberg-words.json")
      .map(async (dictFile: string) => {
        const dict = await fs.readFile(
          `${standardDictionariesDir}/${dictFile}`,
          "utf8"
        );
        return JSON.parse(dict);
      })
  ).catch((error) => {
    throw new Error(
      `There was an error reading the standard Typey Type dictionary set. ${error}`
    );
  });
  const zippedDictionariesNamesAndContents = zipDictNameAndContents(
    standardDictionarySet.filter(
      (name) => name !== "top-10000-project-gutenberg-words.json"
    ),
    standardDicts
  );

  const seen = new Map();

  for (const [dictName, dict] of zippedDictionariesNamesAndContents) {
    for (const [outline] of Object.entries(dict)) {
      if (seen.get(outline)) {
        seen.set(outline, [...seen.get(outline), dictName]);
      } else {
        seen.set(outline, [dictName]);
      }
    }
  }

  const duplicates = new Map();
  for (const [outline, dictNames] of seen) {
    if (dictNames.length > 1) {
      duplicates.set(outline, dictNames);
    }
  }

  console.log("📣 Duplicates…");
  console.log(duplicates);
};

export default {
  run,
};
