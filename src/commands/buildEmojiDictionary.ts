"use strict";

import fs from "node:fs/promises";
import { PerformanceObserver, performance } from "node:perf_hooks";

import dictionaryIntermediateDir from "../consts/dictionaryIntermediateDir";
import standardDictionariesDir from "../consts/standardDictionariesDir";
import standardDictionarySet from "../consts/standardDictionarySet.json";

import type { StenoDictionary } from "../shared/types";

type Options = {
  target: string;
};

/**
 * This command builds the emoji dictionary with multiple ways to write each emoji.
 */
const run = async (options: Options) => {
  const perfObserver = new PerformanceObserver((items) => {
    items.getEntries().forEach((entry) => {
      console.log(`⏱  ${entry.duration} ms to build emoji dictionary`);
    });
  });
  perfObserver.observe({ entryTypes: ["measure"], buffered: true });
  performance.mark("build-emoji-dict-start");

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
      `There was an error reading the standard Typey Type dictionary set to build the emoji dict. ${error}`
    );
  });

  const emojiVocabDict: StenoDictionary = {};
  standardDicts.forEach((dict) => {
    const entries = Object.entries(dict);
    entries.forEach(([outline, translation]) => {
      emojiVocabDict[outline] = translation;
    });
  });

  const contents = JSON.stringify(emojiVocabDict, null, 2);

  await fs
    .writeFile(`${dictionaryIntermediateDir}/emoji-vocab-dict.json`, contents)
    .catch((err) => {
      if (err) {
        console.error(err);
      }
    });

  // TODO: build options.target file, emoji.json:
  console.log(options.target);

  performance.mark("build-emoji-dict-end");
  performance.measure(
    "build-emoji-dict",
    "build-emoji-dict-start",
    "build-emoji-dict-end"
  );
};

export default {
  run,
};
