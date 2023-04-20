"use strict";

import fs from "node:fs/promises";
import { PerformanceObserver, performance } from "node:perf_hooks";

import combineDictNamesAndContentsIntoDict from "../utils/combineDictNamesAndContentsIntoDict";
import standardDictionariesDir from "../consts/standardDictionariesDir";
import standardDictionarySet from "../consts/standardDictionarySet.json";
import zipDictNameAndContents from "../utils/zipDictNameAndContents";

import type { StenoDictionary } from "../shared/types";

type Options = {
  target: string;
};

/**
 * This command builds the Typey Type dictionary with brief solitude (only 1 preferred entry for
 * each word) as a steno dictionary. It's used by the Typey Type app to show preferred entries.
 */
const run = async (options: Options) => {
  const perfObserver = new PerformanceObserver((items) => {
    items.getEntries().forEach((entry) => {
      console.log(`⏱  ${entry.duration} ms to build dictionary`);
    });
  });
  perfObserver.observe({ entryTypes: ["measure"], buffered: true });
  performance.mark("build-dict-start");

  // console.log("Build Typey Type dict with brief solitude");
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
  const combinedJSON = combineDictNamesAndContentsIntoDict(
    zippedDictionariesNamesAndContents
  );
  const combined = JSON.stringify(combinedJSON, null, 2);

  await fs.writeFile(options.target, combined).catch((err) => {
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
