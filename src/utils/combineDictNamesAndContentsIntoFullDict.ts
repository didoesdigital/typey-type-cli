import rankOutlines from "../shared/utils/transformingDictionaries/rankOutlines/rankOutlines";
import affixesJSON from "../consts/affixes.json";
import sortByStenoOrder from "./sortByStenoOrder";
import misstrokesJSON from "../shared/json/misstrokes.json";

import type {
  AffixObject,
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

const misstrokes = misstrokesJSON as StenoDictionary;
const affixes = affixesJSON as AffixObject;

// TODO: For building out the CLI, this should initially rank outlines before combining to match
// existing dictionary behaviour but later we may wish to support dictionaries more accurately
// reflecting steno engine behaviour of overriding entries in order, then ranking results.

/**
 * Combines dictionaries
 *
 * @remarks
 * This method combines raw dictionaries based on their order, ranking outlines
 * before combining except where two outlines are equal where it then relies on
 * order. It produces a full dictionary.
 *
 * @param dictionariesNamesAndContents - example: `[["test1.json", { "TEFT/-G": "test1" }], ["test2.json", { "TEFT/-G": "test2" }]];`
 * @returns A realistic steno dictionary
 */
const combineDictNamesAndContentsIntoFullDict = (
  dictionariesNamesAndContents: DictionaryNameAndContents[]
): StenoDictionary => {
  const tempLookupDict: TempDict = new Map();

  // Here's an example of adding subsequent entries:
  // previousItem:
  // "test": [["TEFT", "dict1.json"]]
  // nextRound:
  // "test": [["TEFT", "dict1.json"], ["TEFTD": "dict2.json"]]
  // yetAnotherRound:
  // "test": [["TEFT", "dict1.json"], ["TEFTD": "dict2.json"], ["TEFT": "dict3.json"]]

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

  // Produce steno dictionary with multiple outlines per word as a Map:
  const result: DictEntryMap = new Map();
  tempLookupDict.forEach((outlinesAndDictNames, translation) => {
    const listOfStrokeAndDictAndNamespace = outlinesAndDictNames.map(
      (outlinesAndDictNames): StrokeAndDictionaryAndNamespace => [
        ...outlinesAndDictNames,
        "typey",
      ]
    );

    const allOutlines = rankOutlines(
      listOfStrokeAndDictAndNamespace,
      misstrokes,
      translation,
      affixes
    );

    for (const [outline] of allOutlines) {
      result.set(outline, translation);
    }
  });

  const sortedResult = sortByStenoOrder([...result]);
  const stenoDictResult = Object.fromEntries(sortedResult);
  return stenoDictResult;
};

export default combineDictNamesAndContentsIntoFullDict;
