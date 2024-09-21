import numberDictionaryEntries from "../consts/numberDictionaryEntries";
import namespacedTypeyDict from "../consts/namespacedTypeyDict";
import type {
  StenoDictionary,
  LookupDictWithNamespacedDicts,
} from "../shared/types";

/**
 * Creates a lookup dictionary
 *
 * @remarks
 * This method combines raw steno dictionaries into a word-first lookup dictionary that shows a list of outlines for each translation. It includes numbers by default similar to how Plover has numbers built in.
 *
 * @param dictionaries - example: `[{ "TEFT/-G": "test" }, { "TEFGT": "test" }];`
 * @returns A lookup dictionary e.g. `new Map([["test", [["TEFGT", "typey:typey-type.json"], ["TEFT/-G", "typey:typey-type.json"]]])
 */
const createLookupDict = (
  dictionaries: StenoDictionary[]
): LookupDictWithNamespacedDicts => {
  const lookupDict: LookupDictWithNamespacedDicts = new Map(
    numberDictionaryEntries
  );

  for (let dict = 0; dict < dictionaries.length; dict++) {
    for (const [outline, translation] of Object.entries(dictionaries[dict])) {
      const previousItem = lookupDict.get(translation);
      if (previousItem) {
        lookupDict.set(translation, [
          ...previousItem,
          [outline, namespacedTypeyDict],
        ]);
      } else {
        lookupDict.set(translation, [[outline, namespacedTypeyDict]]);
      }
    }
  }

  return lookupDict;
};

export default createLookupDict;
