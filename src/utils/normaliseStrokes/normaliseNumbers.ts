import {
  rightHandIndex,
  stenoOrderWithNumbers,
} from "../../consts/stenoKeys/stenoOrderAndEnglishKeys";

import type { SingleStroke } from "../../shared/types";

/**
 * A single stroke using the number key #
 *
 * Examples:
 * "#"
 * "#S"
 * "#P"
 * "#-P"
 * "#H"
 * "#L"
 * "#-L"
 * "#T"
 * "#-T"
 * "#R-P"
 * "#K-L"
 * "#-D"
 * "#-Z"
 * "#-TZ"
 */
type SingleStrokeUsingNumberBar = SingleStroke;

/* The left-hand map does not contain bottom row keys because they are never numbers */
const leftSideStenoLetterNumberMap = new Map([
  ["S", "1"],
  ["T", "2"],
  ["P", "3"],
  ["H", "4"],
  ["A", "5"],
  ["O", "0"],
]);

/* The right-hand map does not contain vowels, bottom row keys or D because they are never numbers */
const rightSideStenoLetterNumberMap = new Map([
  ["F", "6"],
  ["P", "7"],
  ["L", "8"],
  ["T", "9"],
]);

/**
 *
 * @param stroke - assumes stroke contains `#`
 * @returns - a single steno stroke with numbers normalised e.g. `R-7`, `2`, `#-Z`
 */
const normaliseNumbers = (
  stroke: SingleStrokeUsingNumberBar
): SingleStrokeUsingNumberBar => {
  if (stroke === "#") return stroke;

  const strokeKeys = [...stroke];

  let foundRightHandSide = false;
  let indexToSplit = strokeKeys.length;
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

    if (stenoOrderIndex > rightHandIndex) {
      if (!foundRightHandSide) {
        indexToSplit = strokeIndex;
      }
      foundRightHandSide = true;
      break;
    }

    const strokeKey = strokeKeys[strokeIndex];
    if (strokeKey === stenoOrderWithNumbers[stenoOrderIndex]) {
      strokeIndex++;
    }
  }

  // Note: In this logic, the hyphen "-" falls into the leftHand, which is
  // arbitrary and gets ignored by the letter number maps of either hand anyway:
  const leftHand = stroke.slice(0, indexToSplit);
  const rightHand = stroke.slice(indexToSplit);

  const hasNumberKey =
    !!leftHand.match(/[STPHAO]/) || !!rightHand.match(/[FPLT]/); // STPH, AO, FPLT keys for 1234506789

  const leftHandNormalised = [...leftHand].map(
    (letterStenoKey) =>
      leftSideStenoLetterNumberMap.get(letterStenoKey) ?? letterStenoKey
  );

  const rightHandNormalised = [...rightHand].map(
    (letterStenoKey) =>
      rightSideStenoLetterNumberMap.get(letterStenoKey) ?? letterStenoKey
  );

  const normalisedStroke = leftHandNormalised
    .filter((key) => (hasNumberKey ? key !== "#" : true))
    .concat(rightHandNormalised)
    .join("");

  return normalisedStroke;
};

export default normaliseNumbers;
