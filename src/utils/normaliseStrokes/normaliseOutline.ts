import { normaliseStroke } from "./normaliseDictEntries";

import type { Outline } from "src/shared/types";

export const normaliseOutline = (outline: Outline): Outline => {
  return outline.split("/").map(normaliseStroke).join("/");
};
