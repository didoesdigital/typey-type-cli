import normaliseImplicitHyphen from "./normaliseImplicitHyphen";
import normaliseNumbers from "./normaliseNumbers";

import type { SingleStroke } from "../../shared/types";

export const normaliseStroke = (stroke: SingleStroke): SingleStroke => {
  if (stroke.includes("#")) {
    stroke = normaliseNumbers(stroke);
  }

  stroke = normaliseImplicitHyphen(stroke);

  return stroke;
};
