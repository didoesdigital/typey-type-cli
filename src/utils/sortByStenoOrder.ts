import stenoOrderAndEnglishKeys, {
  rightHandIndex,
} from "../consts/stenoKeys/stenoOrderAndEnglishKeys";
import { normaliseStroke } from "./normaliseStrokes/normaliseStrokes";

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

const sortByStenoOrder = (entries: DictEntries): DictEntries => {
  const result = entries.sort((aDictEntry, bDictEntry) => {
    const aOutline: Outline = aDictEntry[0];
    const bOutline: Outline = bDictEntry[0];
    const aNormalised = aOutline.split("/").map(normaliseStroke).join("/");
    const bNormalised = bOutline.split("/").map(normaliseStroke).join("/");
    const a = mapOutlineToEnglishCharacters(aNormalised);
    const b = mapOutlineToEnglishCharacters(bNormalised);

    return a.localeCompare(b, "en");
  });

  return result;
};

export default sortByStenoOrder;
