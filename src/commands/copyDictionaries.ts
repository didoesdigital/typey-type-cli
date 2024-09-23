"use strict";

import fs from "node:fs/promises";
import { PerformanceObserver, performance } from "node:perf_hooks";

import dictionariesDir from "../consts/dictionariesDir";
import dictionariesSourceDir from "../consts/dictionariesSourceDir";
import dictionariesIndexSource from "../consts/dictionariesIndexSource";
import didoesdigitalDir from "../consts/didoesdigitalDir";
import checkFileExists from "../utils/checkFileExists";

/** Examples:
 * "lesson-hints/markdown-lesson.json"
 * "plover/commands-3-jun-2018.json",
 * "individual/jade-gg-phrs-18-mar-2019.json",
 */
type DictionaryPath = string;

/** Examples:
 * "dict.json"
 * "react.json"
 * "top-10000-project-gutenberg-words.json"
 */
type DiDoesDigitalDictionaryName = string;

const targetDictionaryDirectories = [
  "didoesdigital",
  "individual",
  "lesson-hints",
  "plover",
  "typey-type",
];
const top10Source = `${dictionariesSourceDir}/typey-type/top-10.json`;
const top10Target = `${dictionariesDir}/typey-type/top-10.json`;
const dictionaryIndexSource = `${dictionariesSourceDir}/dictionaryIndex.json`;
const dictionaryIndexTarget = `${dictionariesDir}/dictionaryIndex.json`;

/**
 * This command copies source dictionaries (Plover, Jade's phrasing dictionary, Di's steno-dictionaries from the submodule, etc.) to the target dictionaries directory. It excludes copying misstrokes.json and emoji.json from submodule to target dictionaries directory, which are generated elsewhere.
 */
const run = async () => {
  const measure = "copy-dictionaries";
  const perfObserver = new PerformanceObserver((items) => {
    items.getEntries().forEach((entry) => {
      console.log(
        `⏱  ${entry.duration} ms to copy dictionaries from files listed in ${dictionariesIndexSource}`
      );
    });
  });
  perfObserver.observe({ entryTypes: ["measure"], buffered: true });
  performance.mark(`${measure}-start`);

  targetDictionaryDirectories.forEach(async (targetDictDir) => {
    if (!(await checkFileExists(`${dictionariesDir}/${targetDictDir}`))) {
      await fs.mkdir(`${dictionariesDir}/${targetDictDir}`);
    }
  });

  const sourceContent = await fs.readFile(dictionariesIndexSource, "utf8");

  let listOfDictionaries: null | string[] = null;
  try {
    listOfDictionaries = JSON.parse(sourceContent);
  } catch (error) {
    console.error(
      `Error: there was an error parsing the source dictionaries index file. `,
      error
    );
  }

  if (listOfDictionaries) {
    listOfDictionaries.forEach(async (dictionaryPath: DictionaryPath) => {
      const sourceFile = `${dictionariesSourceDir}/${dictionaryPath}`;
      const targetFile = `${dictionariesDir}/${dictionaryPath}`;

      try {
        // console.log({ sourceFile, targetFile });
        await fs.copyFile(sourceFile, targetFile);
      } catch (error) {
        console.error(
          `Unable to copy dictionary: ${dictionaryPath}. Make sure the directory exists first? `,
          error
        );
      }
    });
  }

  let listOfDiDoesDigitalDictionaries: DiDoesDigitalDictionaryName[] | null =
    null;
  try {
    listOfDiDoesDigitalDictionaries = (
      await fs.readdir(didoesdigitalDir)
    ).filter(
      (dictName) => !["emoji.json", "misstrokes.json"].includes(dictName)
    );
  } catch (err) {
    console.error(err);
  }

  if (listOfDiDoesDigitalDictionaries) {
    if (!(await checkFileExists(`${dictionariesDir}/didoesdigital/`))) {
      console.log(`Creating ${dictionariesDir}/didoesdigital/`);
      await fs.mkdir(`${dictionariesDir}/didoesdigital/`, { recursive: true });
    }

    for (const didoesdigitalDict of listOfDiDoesDigitalDictionaries) {
      const sourceFile = `${didoesdigitalDir}/${didoesdigitalDict}`;
      const targetFile = `${dictionariesDir}/didoesdigital/${didoesdigitalDict}`;
      try {
        // console.log({ sourceFile, targetFile });
        await fs.copyFile(sourceFile, targetFile);
      } catch (error) {
        console.error(
          `Unable to copy dictionary: ${didoesdigitalDict}. `,
          error
        );
      }
    }
  }

  try {
    // console.log({ top10Source, top10Target });
    await fs.copyFile(top10Source, top10Target);
  } catch (error) {
    console.error(`Unable to copy dictionary: ${top10Source}.`, error);
  }

  try {
    // console.log({ dictionaryIndexSource, dictionaryIndexTarget });
    await fs.copyFile(dictionaryIndexSource, dictionaryIndexTarget);
  } catch (error) {
    console.error(`Unable to copy dictionary index: ${top10Source}.`, error);
  }

  performance.mark(`${measure}-end`);
  performance.measure(`${measure}`, `${measure}-start`, `${measure}-end`);
};

export default {
  run,
};
