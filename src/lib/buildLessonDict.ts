"use strict";

import type { DictEntries } from "../cli-types";

type LessonDictString = string;

/*
 * Builds lesson dictionary string in preparation for writing to a file
 */
const buildLessonDict = async (
  entries: DictEntries
): Promise<LessonDictString> => {
  return (
    JSON.stringify(Object.fromEntries(entries), null, " ")
      .split("\n")
      // .filter(Boolean)
      .map((line) => line.replace(/^ /, ""))
      .concat("")
      .join("\n")
  );
};

export default buildLessonDict;
