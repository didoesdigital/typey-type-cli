import stenoOrderAndEnglishKeys, {
  rightHandIndex,
} from "../consts/stenoKeys/stenoOrderAndEnglishKeys";
import { normaliseOutline } from "./normaliseStrokes/normaliseDictEntries";

import type { Outline, SingleStroke } from "../shared/types";
import type { DictEntries } from "../cli-types";

const mapStrokeToEnglishCharacters = (stroke: SingleStroke): string => {
  const strokeKeys = [...stroke];
  const result = [];

  let i = 0;
  if (stroke.startsWith("-")) {
    i = rightHandIndex; // Skip to right-hand side
    strokeKeys.shift(); // Disregard hyphen for sorting
  }

  for (i; i < stenoOrderAndEnglishKeys.length; i++) {
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

const cache = new Map();

const sortByStenoOrder = (entries: DictEntries): DictEntries => {
  const result = entries.sort((aDictEntry, bDictEntry) => {
    const aOutline: Outline = aDictEntry[0];
    const bOutline: Outline = bDictEntry[0];
    const a =
      cache.get(aOutline) ??
      mapOutlineToEnglishCharacters(normaliseOutline(aOutline));
    const b =
      cache.get(bOutline) ??
      mapOutlineToEnglishCharacters(normaliseOutline(bOutline));

    cache.set(aOutline, a);
    cache.set(bOutline, b);

    return a.localeCompare(b, "en");
  });

  return result;
};

export default sortByStenoOrder;
