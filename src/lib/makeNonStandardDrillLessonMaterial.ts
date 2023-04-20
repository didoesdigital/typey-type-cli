"use strict";

import convertDictionaryToEntriesFilteredByWordList from "../lib/convertDictionaryToEntriesFilteredByWordList";

import type { StenoDictionary } from "../shared/types";

const makeNonStandardDrillLessonMaterial = (
  words: string[],
  firstRecommendedDict: StenoDictionary
) => {
  const entries = convertDictionaryToEntriesFilteredByWordList(
    words,
    firstRecommendedDict
  );
  const transformedEntries = entries;

  return [entries, transformedEntries];
};

export default makeNonStandardDrillLessonMaterial;
