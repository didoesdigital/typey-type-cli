"use strict";

import generateLessonEntriesFromRules from "./generateLessonEntriesFromRules";
import transformEntriesTranslations from "./transformEntriesTranslations";

import type { Rules } from "../cli-types";
import type {
  LookupDictWithNamespacedDicts,
  Translation,
} from "../shared/types";

const makeNonStandardFundamentalLessonMaterial = (
  recommendedLookupDict: LookupDictWithNamespacedDicts,
  rules: Rules,
  exclusions: Translation[],
  words: string[]
) => {
  const entries = generateLessonEntriesFromRules(
    recommendedLookupDict,
    rules,
    exclusions,
    words
  );
  const transformedEntries = transformEntriesTranslations(entries, rules).sort(
    (a, b) => words.indexOf(a[1]) - words.indexOf(b[1])
  );

  return [entries, transformedEntries];
};

export default makeNonStandardFundamentalLessonMaterial;
