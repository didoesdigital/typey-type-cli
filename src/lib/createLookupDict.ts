import numberDictionaryEntries from "../consts/numberDictionaryEntries";

import type {
  StenoDictionary,
  LookupDictWithNamespacedDicts,
  DictName,
} from "../shared/types";

/**
 * Creates a lookup dictionary
 *
 * @remarks
 * This method combines raw steno dictionaries into a word-first lookup dictionary that shows a list of outlines for each translation. It includes numbers by default similar to how Plover has numbers built in.
 *
 * @param dictionariesAndTheirNames - example: `[[{ "TEFT/-G": "test" }, { "TEFGT": "test" }], "tpg.json"]`
 * @returns A lookup dictionary e.g. `new Map([["test", [["TEFGT", "typey:typey-type.json"], ["TEFT/-G", "typey:typey-type.json"]]])
 */
const createLookupDict = (
  dictionariesAndTheirNames: [StenoDictionary, DictName][]
): LookupDictWithNamespacedDicts => {
  const lookupDict: LookupDictWithNamespacedDicts = new Map(
    numberDictionaryEntries
  );

  for (let dict = 0; dict < dictionariesAndTheirNames.length; dict++) {
    const [dictionary, dictName] = dictionariesAndTheirNames[dict];

    for (const [outline, translation] of Object.entries(dictionary)) {
      const previousItem = lookupDict.get(translation);
      if (previousItem) {
        lookupDict.set(translation, [
          ...previousItem,
          [outline, `typey:${dictName}`],
        ]);
      } else {
        lookupDict.set(translation, [[outline, `typey:${dictName}`]]);
      }
    }
  }

  return lookupDict;
};

export default createLookupDict;
