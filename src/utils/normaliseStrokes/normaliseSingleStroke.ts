import normaliseImplicitHyphen from "./normaliseImplicitHyphen";
import normaliseNumbers from "./normaliseNumbers";

import type { SingleStroke } from "../../shared/types";

/**
 * Normalises a single steno so they are always represented in a consistent way.
 *
 * This method normalises numbers and implicit hyphens in a steno stroke, for example:
 *
 * - adds a hyphen to stroke with unambiguous right-hand key
 * - adds a hyphen to stroke starting with suffix key
 * - does not add a hyphen to ambiguous left-hand key
 * - removes hyphen from left-hand numbers with right-hand letters
 * - converts number bar and letters into numbers
 * - preserves number bar when adding a non-number key
 *
 * Example: `"#T"` => `"2"`
 * Example: `"#-T"` => `"-9"`
 * Example: `"P-P"` => `"P-P"`
 *
 * @param stroke - a single, potentially un-normalised stroke
 * @returns - normalised stroke
 */
const normaliseSingleStroke = (stroke: SingleStroke): SingleStroke => {
  if (stroke.includes("#")) {
    stroke = normaliseNumbers(stroke);
  }

  stroke = normaliseImplicitHyphen(stroke);

  return stroke;
};

export default normaliseSingleStroke;
