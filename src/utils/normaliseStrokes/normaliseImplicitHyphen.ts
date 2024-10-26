import type { SingleStroke } from "../../shared/types";

const stenoOrder = [..."1S2TK3PW4HR5A0O*EU-6FR7PB8LG9TSDZ"];
const rightHandIndex = stenoOrder.indexOf("-");

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

  let foundAVowel = false;
  let strokeIndex = 0;
  let stenoOrderIndex = 0;
  for (
    stenoOrderIndex;
    stenoOrderIndex < stenoOrder.length;
    stenoOrderIndex++
  ) {
    if (strokeIndex > strokeKeys.length) {
      break;
    }

    const strokeKey = strokeKeys[strokeIndex];

    if (strokeKey === stenoOrder[stenoOrderIndex]) {
      if ("AOEU*".includes(strokeKey)) {
        foundAVowel = true;
      }

      // Remove unnecessary hyphen when there's a vowel:
      if (strokeKey === "-" && foundAVowel) {
        return stroke.replace("-", "");
      }

      // Insert implicit hyphen when there's a right-hand key:
      if (
        !foundAVowel &&
        stenoOrderIndex > rightHandIndex &&
        // !strokeKeys.slice(0, strokeIndex).includes("-")
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
