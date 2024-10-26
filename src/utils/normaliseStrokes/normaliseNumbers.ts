import type { SingleStroke } from "../../shared/types";

const stenoLetterNumberMap = new Map([
  ["S", "1"],
  ["T", "2"],
  ["P", "3"],
  ["H", "4"],
  ["A", "5"],
  ["O", "0"],
  ["F", "6"],
  ["P", "7"],
  ["L", "8"],
  ["T", "9"],
]);

export const getNumberStenoKey = (letterStenoKey: string): string => {
  return stenoLetterNumberMap.get(letterStenoKey) ?? letterStenoKey;
};

const normaliseNumbers = (stroke: SingleStroke): SingleStroke => {
  return [...stroke]
    .filter((stenoKey) => stenoKey !== "#")
    .map((letterStenoKey) => getNumberStenoKey(letterStenoKey))
    .join("");
};

export default normaliseNumbers;
