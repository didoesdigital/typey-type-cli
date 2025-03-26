"use strict";

import fs from "node:fs/promises";
import isFingerspelled from "../lib/rules/isFingerspelled";
import type { DictEntry, DictionaryNameAndContents } from "src/cli-types";
import type { DictName, StenoDictionary } from "src/shared/types";

/** A path to a JSON dictionary file */
type DictionaryPathArgument = string;

const emptyDictsWithFingerspelledOutlines: [DictName, DictEntry[]][] = [];
const emptyFingerspelledOutlines: DictEntry[] = [];

/**
 * This command checks dictionaries for outlines containing only fingerspelled strokes
 *
 * - It reads all of the outlines in the given dictionaries
 * - It returns a list of outlines that contain only fingerspelled strokes and
 *   the dictionary path those outlines came from
 */
const run = async (argument: DictionaryPathArgument[]) => {
  const dictionaries: [string, StenoDictionary][] = await Promise.all(
    argument.map(async (dictFile: string) => {
      const dict = await fs.readFile(dictFile, "utf8");
      const result: DictionaryNameAndContents = [dictFile, JSON.parse(dict)];
      return result;
    })
  ).catch((error) => {
    throw new Error(`There was an error given dictionaries. ${error}`);
  });

  const result = dictionaries.reduce((previousList, currentEntry) => {
    const [dictName, dictContents] = currentEntry;
    const fingerspelledOutlines = Object.entries(dictContents).reduce(
      (previousList, currentEntry) => {
        if (isFingerspelled(currentEntry[0], currentEntry[1])) {
          previousList.push(currentEntry);
          return previousList;
        } else {
          return previousList;
        }
      },
      emptyFingerspelledOutlines.slice()
    );

    if (fingerspelledOutlines.length > 0) {
      previousList.push([dictName, fingerspelledOutlines]);
      return previousList;
    } else {
      return previousList;
    }
  }, emptyDictsWithFingerspelledOutlines.slice());

  console.log(
    result.length
      ? JSON.stringify(result, null, 2)
      : "No fingerspelled outlines! 🎉"
  );
};

export default {
  run,
};
