"use strict";

import fs from "node:fs/promises";

import standardDictionarySet from "../consts/standardDictionarySet.json";
import standardDictionariesDir from "../consts/standardDictionariesDir";
import zipDictNameAndContents from "../utils/zipDictNameAndContents";
import type { DictName, StenoDictionary, Translation } from "src/shared/types";

type Options = {
  uniqueTranslations?: boolean;
};

type Duplicates = Map<
  string,
  { dictName: DictName; translation: Translation }[]
>;

const ignoreExpectedDuplicateDictionaries = [
  "top-10000-project-gutenberg-words.json",
  "punctuation-unspaced.json",
];

/**
 * This command checks for duplicate outlines in the standard Typey Type dictionaries.
 *
 * @param options.uniqueTranslations - If true, it will only show outlines with differing translations.
 *
 * - It reads all of the outlines in all of the dictionaries
 * - It gathers up duplicate outlines
 * - It shows results as an outline and which dictionaries it appears in
 */
const run = async (options: Options) => {
  const standardDicts: StenoDictionary[] = await Promise.all(
    standardDictionarySet
      .filter((name) => !ignoreExpectedDuplicateDictionaries.includes(name))
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
      (name) => !ignoreExpectedDuplicateDictionaries.includes(name)
    ),
    standardDicts
  );

  const seen = new Map();

  for (const [dictName, dict] of zippedDictionariesNamesAndContents) {
    for (const [outline, translation] of Object.entries(dict)) {
      if (seen.get(outline)) {
        seen.set(outline, [
          ...seen.get(outline),
          { dictName: dictName, translation },
        ]);
      } else {
        seen.set(outline, [{ dictName: dictName, translation }]);
      }
    }
  }

  const duplicates: Duplicates = new Map();
  for (const [outline, listOfDictAndTranslation] of seen) {
    if (listOfDictAndTranslation.length > 1) {
      duplicates.set(outline, listOfDictAndTranslation);
    }
  }

  if (options.uniqueTranslations) {
    for (const [outline, listOfDictAndTranslation] of duplicates) {
      const firstTranslation = listOfDictAndTranslation[0].translation;
      const differingTranslations = listOfDictAndTranslation.filter(
        (dictAndTranslation) =>
          dictAndTranslation.translation !== firstTranslation
      );
      if (differingTranslations.length > 0) {
        console.log(`"${outline}"`);
        console.log(
          `  - ${listOfDictAndTranslation[0].dictName}: "${firstTranslation}"`
        );
        for (const { dictName, translation } of differingTranslations) {
          console.log(`  - ${dictName}: "${translation}"`);
        }
      }
    }
  } else {
    console.log(duplicates);
  }

  console.log(
    `Done checking dictionaries for duplicate outlines with ${
      options.uniqueTranslations ? "unique translations" : "any translations"
    }.`
  );
};

export default {
  run,
};
