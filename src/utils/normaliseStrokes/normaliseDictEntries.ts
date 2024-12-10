import normaliseOutline from "./normaliseOutline";

import type { Outline } from "../../shared/types";
import type { DictEntries, DictEntry } from "../../cli-types";

/**
 * Normalises steno strokes so they are always represented in a consistent way.
 *
 * This method normalises numbers and implicit hyphens in steno strokes, for example:
 *
 * - adds a hyphen to stroke with unambiguous right-hand key
 * - adds a hyphen to stroke starting with suffix key
 * - does not add a hyphen to ambiguous left-hand key
 * - removes hyphen from left-hand numbers with right-hand letters
 * - converts number bar and letters into numbers
 * - preserves number bar when adding a non-number key
 *
 * Example: `["#T/P-P", "test 2{^.^}"]` => `["2/P-P", "test 2{^.^}"]`
 * Example: `["#-T/P-P", "test 9{^.^}"]` => `["9/P-P", "test 9{^.^}"]`
 *
 * @param entries - potentially un-normalised dictionary entries
 * @returns - normalised dictionary entries
 */
const normaliseDictEntries = (entries: DictEntries): DictEntries => {
  const result = entries.map(([outline, translation]) => {
    const normalisedOutline: Outline = normaliseOutline(outline);

    const dictEntry: DictEntry = [normalisedOutline, translation];

    return dictEntry;
  });

  return result;
};

export default normaliseDictEntries;
