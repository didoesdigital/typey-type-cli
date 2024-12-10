import normaliseSingleStroke from "./normaliseSingleStroke";

import type { Outline } from "src/shared/types";

/**
 * Normalises a multi- or single-stroke steno outline so that each stroke is
 * always represented in a consistent way.
 *
 * @param outline - a multi- or single-stroke, potentially un-normalised outline
 * @returns - normalised outline
 */
const normaliseOutline = (outline: Outline): Outline => {
  return outline.split("/").map(normaliseSingleStroke).join("/");
};

export default normaliseOutline;
