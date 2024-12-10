import { normaliseStroke } from "./normaliseStroke";

import type { Outline } from "src/shared/types";

const normaliseOutline = (outline: Outline): Outline => {
  return outline.split("/").map(normaliseStroke).join("/");
};

export default normaliseOutline;
