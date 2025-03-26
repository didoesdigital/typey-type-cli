"use strict";

import fs from "node:fs/promises";
import isFingerspelled from "../lib/rules/isFingerspelled";
import type { DictEntry } from "src/cli-types";
import type { StenoDictionary } from "src/shared/types";

/** A path to a JSON dictionary file */
type DictionaryPath = string;

const emptyFingerspelledOutlines: DictEntry[] = [];

/**
 * This command checks a dictionary for outlines containing only fingerspelled strokes
 *
 * - It reads all of the outlines in the given dictionary
 * - It returns a list of outlines that contain only fingerspelled strokes
 */
const run = async (argument: DictionaryPath) => {
  const dictionary: StenoDictionary = JSON.parse(
    await fs.readFile(argument, "utf8")
  );
  const dictEntries = Object.entries(dictionary);

  const fingerspelledOutlines = dictEntries.reduce(
    (previousList, currentEntry) => {
      if (isFingerspelled(currentEntry[0], currentEntry[1])) {
        previousList.push(currentEntry);
        return previousList;
      } else {
        return previousList;
      }
    },
    emptyFingerspelledOutlines
  );

  console.log(
    fingerspelledOutlines.length
      ? fingerspelledOutlines
      : "No fingerspelled outlines! 🎉"
  );
};

export default {
  run,
};
