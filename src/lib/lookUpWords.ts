"use strict";

import AFFIXES from "../shared/utils/affixes/affixes";
import createStrokeHintForPhrase from "../shared/utils/transformingDictionaries/createStrokeHintForPhrase";
import type { DictEntries } from "../cli-types";
import type { LookupDictWithNamespacedDicts } from "../shared/types";

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
      AFFIXES.getSharedAffixes()
    );

    return [hint, word];
  });

export default lookUpWords;
