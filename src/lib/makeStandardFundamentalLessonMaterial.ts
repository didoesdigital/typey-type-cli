"use strict";

import generateLessonEntriesFromRules from "./generateLessonEntriesFromRules";

import type { Rules } from "../cli-types";
import type {
  LookupDictWithNamespacedDicts,
  Translation,
} from "../shared/types";

const makeStandardFundamentalLessonMaterial = (
  vocabLookupDict: LookupDictWithNamespacedDicts,
  rules: Rules,
  exclusions: Translation[]
) => {
  const entries = generateLessonEntriesFromRules(
    vocabLookupDict,
    rules,
    exclusions
  );
  const transformedEntries = entries;

  return [entries, transformedEntries];
};

export default makeStandardFundamentalLessonMaterial;
