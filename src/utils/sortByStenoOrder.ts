import type { Outline, SingleStroke } from "../shared/types";
import type { DictEntries } from "../cli-types";

const stenoOrderAndEnglishKeys = [
  ["#", "1"],
  ["1", "2"],
  ["S", "3"],
  ["T", "4"],
  ["2", "5"],
  ["K", "6"],
  ["3", "7"],
  ["P", "8"],
  ["W", "9"],
  ["4", "0"],
  ["H", "a"],
  ["R", "b"],
  ["5", "c"],
  ["A", "d"],
  ["0", "e"],
  ["O", "f"],
  ["*", "g"],
  ["-", "h"],
  ["E", "i"],
  ["U", "j"],
  ["6", "k"],
  ["F", "l"],
  ["R", "m"],
  ["7", "n"],
  ["P", "o"],
  ["B", "p"],
  ["8", "q"],
  ["L", "r"],
  ["G", "s"],
  ["9", "t"],
  ["T", "u"],
  ["S", "v"],
  ["D", "w"],
  ["Z", "x"],
];

const mapStrokeToEnglishCharacters = (stroke: SingleStroke): string => {
  const strokeKeys = [...stroke];
  const result = [];

  for (let i = 0; i < stenoOrderAndEnglishKeys.length; i++) {
    if (strokeKeys.length > 0) {
      if (strokeKeys[0] === stenoOrderAndEnglishKeys[i][0]) {
        result.push(stenoOrderAndEnglishKeys[i][1]);
        strokeKeys.shift();
      }
    }
  }

  return result.join("");
};

const mapOutlineToEnglishCharacters = (outline: Outline): string => {
  const result = outline
    .split("/")
    .map((stroke) => {
      return mapStrokeToEnglishCharacters(stroke);
    })
    .join("|");
  return result;
};

const sortByStenoOrder = (entries: DictEntries): DictEntries => {
  const result = entries.sort((aDictEntry, bDictEntry) => {
    const aOutline: Outline = aDictEntry[0];
    const bOutline: Outline = bDictEntry[0];
    const a = mapOutlineToEnglishCharacters(aOutline);
    const b = mapOutlineToEnglishCharacters(bOutline);

    return a.localeCompare(b);
  });

  return result;
};

export default sortByStenoOrder;
