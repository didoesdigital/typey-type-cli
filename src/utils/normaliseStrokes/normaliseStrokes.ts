import normaliseImplicitHyphen from "./normaliseImplicitHyphen";
import normaliseNumbers from "./normaliseNumbers";

import type { Outline, SingleStroke } from "../../shared/types";
import type { DictEntries, DictEntry } from "../../cli-types";

const normaliseStroke = (stroke: SingleStroke): SingleStroke => {
  if (stroke.includes("#")) {
    stroke = normaliseNumbers(stroke);
  }

  stroke = normaliseImplicitHyphen(stroke);

  return stroke;
};

const normaliseStrokes = (entries: DictEntries): DictEntries => {
  const result = entries.map(([outline, translation]) => {
    const strokes = outline.split("/");

    const normalisedStrokes = strokes.map((stroke) => {
      return normaliseStroke(stroke);
    });

    const normalisedOutline: Outline = normalisedStrokes.join("/");

    const dictEntry: DictEntry = [normalisedOutline, translation];
    return dictEntry;
  });

  return result;
};

export default normaliseStrokes;
