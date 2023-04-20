import type { DictName, StenoDictionary } from "../shared/types";
import type { DictionaryNameAndContents } from "../cli-types";

const zipDictNameAndContents = (
  dictionaryNames: DictName[],
  dictionariesContents: StenoDictionary[]
): DictionaryNameAndContents[] => {
  const zipped: DictionaryNameAndContents[] = [];
  let index = 0;
  const length = Math.min(dictionaryNames.length, dictionariesContents.length);
  while (index < length) {
    const newItem: [DictName, StenoDictionary] = [
      dictionaryNames[index],
      dictionariesContents[index],
    ];
    zipped[index] = newItem;
    index += 1;
  }

  return zipped;
};

export default zipDictNameAndContents;
