import LATEST_TYPEY_TYPE_FULL_DICT_NAME from "../../constant/latestTypeyTypeFullDictName";
import createGlobalLookupDictionary from "./createGlobalLookupDictionary";

import type {
  LookupDictWithNamespacedDictsAndConfig,
  PersonalDictionaryNameAndContents,
  StenoDictionary,
} from "../../types";

/**
 * @deprecated This function is deprecated. Use `createGlobalLookupDictionary`
 * without "A" instead.
 *
 * This deprecated function only exists so we don't have to change the
 * structure of a hundred existing tests.
 */
const createAGlobalLookupDictionary = (
  personalDictionariesNamesAndContents: PersonalDictionaryNameAndContents[],
  typeyDicts: StenoDictionary,
  _ploverDict: any = null
): LookupDictWithNamespacedDictsAndConfig => {
  return createGlobalLookupDictionary(personalDictionariesNamesAndContents, [
    [typeyDicts, LATEST_TYPEY_TYPE_FULL_DICT_NAME],
  ]);
};

export default createAGlobalLookupDictionary;
