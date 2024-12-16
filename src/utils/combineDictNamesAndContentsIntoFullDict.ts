import sortByStenoOrder from "./sortByStenoOrder";

import type { Outline, StenoDictionary, Translation } from "../shared/types";

import type { DictionaryNameAndContents } from "../cli-types";

type DictEntryMap = Map<Outline, Translation>;

/**
 * Combines dictionaries
 *
 * @remarks
 * This method combines raw dictionaries based on their order. It produces a
 * full dictionary.
 *
 * @param dictionariesNamesAndContents - example: `[["test1.json", { "TEFT/-G": "test1" }], ["test2.json", { "TEFT/-G": "test2" }]];`
 * @returns A realistic steno dictionary
 */
const combineDictNamesAndContentsIntoFullDict = (
  dictionariesNamesAndContents: DictionaryNameAndContents[]
): StenoDictionary => {
  const result: DictEntryMap = new Map();
  dictionariesNamesAndContents.forEach((dictNameAndContents) => {
    const dictContents = dictNameAndContents[1];
    Object.entries(dictContents).forEach(([outline, translation]) => {
      result.set(outline, translation);
    });
  });

  const sortedResult = sortByStenoOrder([...result]);
  const stenoDictResult = Object.fromEntries(sortedResult);
  return stenoDictResult;
};

export default combineDictNamesAndContentsIntoFullDict;
