"use strict";

import lookUpWords from "../lib/lookUpWords";
import transformEntriesTranslations from "../lib/transformEntriesTranslations";

import type { PresentationOptions } from "../cli-types";
import type { LookupDictWithNamespacedDicts } from "../shared/types";

const makeStandardDrillLessonMaterial = (
  vocabLookupDict: LookupDictWithNamespacedDicts,
  words: string[],
  presentationOptions: PresentationOptions
) => {
  const entries = lookUpWords(words, vocabLookupDict);

  const transformedEntries = transformEntriesTranslations(
    entries,
    // lessons with presentationOptions: "Prefixes", "Suffixes", "Suffixes and prefix briefs"
    presentationOptions || {}
  );

  return [entries, transformedEntries];
};

export default makeStandardDrillLessonMaterial;
