"use strict";

import fs from "node:fs/promises";
import { PerformanceObserver, performance } from "node:perf_hooks";

import combineDictNamesAndContentsIntoDict from "../utils/combineDictNamesAndContentsIntoDict";
import standardDictionariesDir from "../consts/standardDictionariesDir";
import standardDictionarySet from "../consts/standardDictionarySet.json";
import affixesPath from "../consts/affixesPath";
import combineDictNamesAndContentsIntoFullDict from "../utils/combineDictNamesAndContentsIntoFullDict";
import zipDictNameAndContents from "../utils/zipDictNameAndContents";
import misstrokesJSON from "../shared/json/misstrokes.json";
import getAffixesFromLookupDict from "../shared/utils/affixes/getAffixesFromLookupDict";
import getAffixMisstrokesFromMisstrokes from "../shared/utils/affixes/getAffixMisstrokesFromMisstrokes";
import combineValidDictionaries from "../shared/utils/transformingDictionaries/combineValidDictionaries";

import type {
  AffixObject,
  ReadDictionariesData,
  StenoDictionary,
} from "../shared/types";

type Options = {
  target: string;
};

// NOTE: When we are only using Typey Type dictionaries without misstrokes, this can be an empty
// object, otherwise we need to import or fetch a meaningful misstrokes.json file
const misstrokes = misstrokesJSON as StenoDictionary;

/**
 * This command builds the Typey Type dictionary. It technically produces 2
 * dictionaries:
 *
 * - 1 full dict (multiple outlines per word)
 * - 1 slim dict with brief solitude (only 1 preferred entry for each word)
 *
 * Prior to Dec 2024, the slim dictionary was used by the Typey Type app to
 * show preferred entries.
 *
 * This command also builds the affixes file because affixes are a subset of the
 * Typey Type dictionary and whenever the dictionary changes, affixes may
 * change too.
 */
const run = async (options: Options) => {
  const perfObserver = new PerformanceObserver((items) => {
    items.getEntries().forEach((entry) => {
      console.log(`⏱  ${entry.duration} ms to build dictionary`);
    });
  });
  perfObserver.observe({ entryTypes: ["measure"], buffered: true });
  performance.mark("build-dict-start");

  const standardDicts: StenoDictionary[] = await Promise.all(
    standardDictionarySet.map(async (dictFile: string) => {
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
    standardDictionarySet,
    standardDicts
  );

  // NOTE: We actually use the `typey-type-full.json` dictionary after Dec 2024
  const combinedFullJSON = combineDictNamesAndContentsIntoFullDict(
    zippedDictionariesNamesAndContents
  );
  const combinedFull = JSON.stringify(combinedFullJSON, null, 2);
  await fs.writeFile(options.target, combinedFull).catch((err) => {
    if (err) {
      console.error(err);
    }
  });

  // Build affixes.json
  const readDictionariesData: ReadDictionariesData =
    zippedDictionariesNamesAndContents.map(([name, contents]) => [
      contents,
      name,
    ]);
  const affixMisstrokes = getAffixMisstrokesFromMisstrokes(misstrokes);
  const newAffixes: AffixObject = getAffixesFromLookupDict(
    combineValidDictionaries([], readDictionariesData),
    affixMisstrokes
  );

  await fs.writeFile(`${affixesPath}`, JSON.stringify(newAffixes, null, 2));
  // NOTE: I'm working through CLI changes to *generate* the `affixes.json` instead of using a static source file. I want to avoid producing 1 giant diff that affects lots of lessons at once. To that end, after writing the `affixes.json` file here I immediately write over it by copying the original, static source file. We can then manually change parts of the static source file towards the generated version and roll out lesson changes a small chunk at a time. Once that work is complete, delete this try-catch block:
  try {
    await fs.copyFile("src/consts/affixes.json", affixesPath);
    console.log(
      "The original src/consts/affixes.json was copied to faux-typey-type-data/affixes/affixes.json"
    );
  } catch {
    console.error("The file could not be copied");
  }

  // NOTE: The `typey-type.json` dictionary is no longer used after Dec 2024
  // but we continue to build it for anyone that may be relying on it:
  const combinedSlimJSON = combineDictNamesAndContentsIntoDict(
    zippedDictionariesNamesAndContents
  );
  const combinedSlim = JSON.stringify(combinedSlimJSON, null, 2);
  const slimTarget = `${options.target.replace("-full.json", ".json")}`;
  await fs.writeFile(slimTarget, combinedSlim).catch((err) => {
    if (err) {
      console.error(err);
    }
  });

  performance.mark("build-dict-end");
  performance.measure("build-dict", "build-dict-start", "build-dict-end");
};

export default {
  run,
};
