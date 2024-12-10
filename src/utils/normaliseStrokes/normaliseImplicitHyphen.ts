import {
  rightHandIndex,
  stenoOrderWithNumbers,
} from "../../consts/stenoKeys/stenoOrderAndEnglishKeys";

import type { SingleStroke } from "../../shared/types";

/**
 * This command normalises hyphens in a single steno stroke.
 *
 * @param stroke - a single steno stroke where any numbers are already normalised
 * @returns a single steno stroke with implicit hyphens added and unnecessary hyphens removed
 */
const normaliseImplicitHyphen = (stroke: SingleStroke): SingleStroke => {
  if (stroke.endsWith("-")) {
    return stroke.slice(0, stroke.length - 1);
  }

  const strokeKeys = [...stroke];

  if (stroke.match(/[AOEU*]/) && !stroke.includes("-")) {
    return stroke;
  }

  let foundVowelLikeKey = false;
  let strokeIndex = 0;
  let stenoOrderIndex = 0;
  for (
    stenoOrderIndex;
    stenoOrderIndex < stenoOrderWithNumbers.length;
    stenoOrderIndex++
  ) {
    if (strokeIndex > strokeKeys.length) {
      break;
    }

    const strokeKey = strokeKeys[strokeIndex];

    if (strokeKey === stenoOrderWithNumbers[stenoOrderIndex]) {
      if ("50AOEU*".includes(strokeKey)) {
        foundVowelLikeKey = true;
      }

      // Remove unnecessary hyphen when there's a vowel:
      if (strokeKey === "-" && foundVowelLikeKey) {
        return stroke.replace("-", "");
      }

      // Insert implicit hyphen when there's a right-hand key:
      if (
        !foundVowelLikeKey &&
        stenoOrderIndex > rightHandIndex &&
        !strokeKeys.includes("-")
      ) {
        return `${stroke.slice(0, strokeIndex)}-${stroke.slice(strokeIndex)}`;
      }

      strokeIndex++;
    }
  }

  return stroke;
};

export default normaliseImplicitHyphen;
