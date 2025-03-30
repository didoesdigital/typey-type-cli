import rankOutlines from "../shared/utils/transformingDictionaries/rankOutlines/rankOutlines";
import AFFIXES from "../shared/utils/affixes/affixes";
import sortByStenoOrder from "./sortByStenoOrder";

import type {
  DictName,
  Outline,
  StenoDictionary,
  StrokeAndDictionaryAndNamespace,
  Translation,
} from "../shared/types";

import type { DictionaryNameAndContents } from "../cli-types";

type DictEntryMap = Map<Outline, Translation>;
type OutlineAndDictName = [Outline, DictName];
/**
 * Example:
 * Map: {
 *   "hors d'oeuvres" => [["HOR/TKEFRBZ", "condensed-strokes.json"], ["OR/TK*EFRS", "dict.json"]]
 * }
 */
type TempDict = Map<Translation, OutlineAndDictName[]>;

// NOTE: We are only using Typey Type dictionaries without misstrokes, otherwise we'd need to
// import the misstrokes.json file here instead of using an empty object
const misstrokes = {};

/**
 * Combines dictionaries into a slim dictionary with brief solitude
 *
 * @remarks
 * This method combines raw dictionaries based on their order, ranking outlines
 * before combining except where two outlines are equal where it then relies on
 * order. It produces a **slim** dictionary with brief solitude (one
 * outline/entry per word/phrase/translation).
 *
 * NOTE: The slim `typey-type.json` dictionary is no longer used after Dec 2024
 * but we continue to build it for anyone that may be relying on it.
 *
 * @param dictionariesNamesAndContents - example: `[["test1.json", { "TEFT/-G": "test1" }], ["test2.json", { "TEFT/-G": "test2" }]];`
 * @returns A realistic steno dictionary
 */
const combineDictNamesAndContentsIntoDict = (
  dictionariesNamesAndContents: DictionaryNameAndContents[]
): StenoDictionary => {
  const tempLookupDict: TempDict = new Map();

  // Here's an example of adding subsequent entries:
  // previousItem:
  // "test": [["TEFT", "dict1.json"]]
  // nextRound:
  // "test": [["TEFT", "dict1.json"], ["TEFTD": "dict2.json"]]

  // Produce word-first tempLookupDict: TempDict:
  for (let dict = 0; dict < dictionariesNamesAndContents.length; dict++) {
    const [dictName, dictContents] = dictionariesNamesAndContents[dict];
    for (const [outline, translation] of Object.entries(dictContents)) {
      const previousItem = tempLookupDict.get(translation);
      if (previousItem) {
        tempLookupDict.set(translation, [...previousItem, [outline, dictName]]);
      } else {
        tempLookupDict.set(translation, [[outline, dictName]]);
      }
    }
  }

  // Produce steno dictionary with brief solitude as a Map:
  const result: DictEntryMap = new Map();
  tempLookupDict.forEach((outlinesAndDictNames, translation) => {
    const foundTopGutenbergEntry = outlinesAndDictNames.find(
      (outlineAndDictName) =>
        outlineAndDictName[1] === "top-10000-project-gutenberg-words.json"
    );

    const listOfStrokeAndDictAndNamespace = outlinesAndDictNames.map(
      (outlinesAndDictNames): StrokeAndDictionaryAndNamespace => [
        ...outlinesAndDictNames,
        "typey",
      ]
    );

    if (foundTopGutenbergEntry) {
      result.set(foundTopGutenbergEntry[0], translation);
    } else {
      const allOutlines = rankOutlines(
        listOfStrokeAndDictAndNamespace,
        misstrokes,
        translation,
        AFFIXES.getSharedAffixes()
      );

      const bestOutline = allOutlines[0][0];

      result.set(bestOutline, translation);
    }
  });

  const sortedResult = sortByStenoOrder([...result]);
  return Object.fromEntries(sortedResult);
};

export default combineDictNamesAndContentsIntoDict;
