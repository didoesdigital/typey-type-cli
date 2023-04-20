"use strict";

import AFFIXES from "../consts/affixes.json";
import createStrokeHintForPhrase from "../shared/utils/transformingDictionaries/createStrokeHintForPhrase";
import type { DictEntries } from "../cli-types";
import type {
  AffixObject,
  LookupDictWithNamespacedDicts,
} from "../shared/types";

/**
 * Look up words in dict
 *
 * @param words - list of words for which to look up outlines
 * @param lookupDict - ranked lookupDict to find outlines from
 */
const lookUpWords = (
  words: string[],
  lookupDict: LookupDictWithNamespacedDicts
): DictEntries =>
  words.map((word) => {
    const hint = createStrokeHintForPhrase(
      word,
      lookupDict,
      // NOTE: it expects tuples but we cannot add types to the JSON file to make it match
      AFFIXES as AffixObject
    );

    return [hint, word];
  });

export default lookUpWords;
