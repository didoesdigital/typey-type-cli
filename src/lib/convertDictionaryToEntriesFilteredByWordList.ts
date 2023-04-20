"use strict";

import type { DictEntries } from "../cli-types";
import type { StenoDictionary } from "../shared/types";

/**
 * Converts a dictionary to outline & translation entries filtered by the lesson word list
 *
 * @remarks
 * This method is used for non-standard drills like phrasing brief lessons where a phrase can appear
 * in the lesson repeatedly but with different outlines from the 1 dictionary.
 *
 * @param words - list of words for which to look up outlines
 * @param recommendedDictionary - the recommended steno dictionary to use for the lesson
 */
const convertDictionaryToEntriesFilteredByWordList = (
  words: string[],
  recommendedDictionary: StenoDictionary
): DictEntries => {
  const wordSet = new Set(words);

  const dictionaryAsLesson: DictEntries = Object.entries(
    recommendedDictionary
  ).filter((entry) => (wordSet.has(entry[1]) ? true : false));

  return dictionaryAsLesson;
};

export default convertDictionaryToEntriesFilteredByWordList;
