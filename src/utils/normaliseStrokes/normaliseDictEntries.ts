import normaliseOutline from "./normaliseOutline";

import type { Outline } from "../../shared/types";
import type { DictEntries, DictEntry } from "../../cli-types";

/**
 * Normalises outlines in dictionary entries so that the outline's strokes are
 * always represented in a consistent way.
 *
 * It uses the method to normalise numbers and implicit hyphens in outlines for
 * every entry, for example:
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
