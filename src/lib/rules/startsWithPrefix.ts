import AFFIXES from "../../consts/affixes.json";

const startsWithPrefix = (outline: string, translation: string) =>
  AFFIXES.prefixes.some(
    ([prefixOutline, prefixText]) =>
      outline.startsWith(prefixOutline) && translation.startsWith(prefixText)
  );

export default startsWithPrefix;
