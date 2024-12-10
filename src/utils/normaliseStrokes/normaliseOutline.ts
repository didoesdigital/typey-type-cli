import { normaliseSingleStroke } from "./normaliseSingleStroke";

import type { Outline } from "src/shared/types";

const normaliseOutline = (outline: Outline): Outline => {
  return outline.split("/").map(normaliseSingleStroke).join("/");
};

export default normaliseOutline;
