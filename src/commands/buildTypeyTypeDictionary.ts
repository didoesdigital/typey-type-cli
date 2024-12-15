"use strict";

import fs from "node:fs/promises";
import { PerformanceObserver, performance } from "node:perf_hooks";

import combineDictNamesAndContentsIntoDict from "../utils/combineDictNamesAndContentsIntoDict";
import standardDictionariesDir from "../consts/standardDictionariesDir";
import standardDictionarySet from "../consts/standardDictionarySet.json";
import zipDictNameAndContents from "../utils/zipDictNameAndContents";

import type { StenoDictionary } from "../shared/types";
import combineDictNamesAndContentsIntoFullDict from "../utils/combineDictNamesAndContentsIntoFullDict";

type Options = {
  target: string;
};

/**
 * This command builds the Typey Type dictionary. It technically produces 2
 * dictionaries:
 *
 * - 1 full dict (multiple outlines per word)
 * - 1 slim dict with brief solitude (only 1 preferred entry for each word)
 *
 * Prior to Dec 2024, the slim dictionary was used by the Typey Type app to
 * show preferred entries.
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

  performance.mark("build-dict-end");
  performance.measure("build-dict", "build-dict-start", "build-dict-end");
};

export default {
  run,
};
