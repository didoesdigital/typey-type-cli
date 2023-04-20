"use strict";

import fs from "node:fs/promises";

import lessonIntermediateDir from "../consts/lessonIntermediateDir";

import type { LessonPathWithoutBasenameAndWithFilename } from "../cli-types";

const readWordCount = async (
  metaPath: LessonPathWithoutBasenameAndWithFilename
) => {
  const wordCountPath = `${lessonIntermediateDir}${metaPath.replace(
    "lesson.txt",
    "word-count.txt"
  )}`;

  let result = 0;

  try {
    const wordCount = await fs.readFile(wordCountPath, "utf8");
    result = +wordCount;
  } catch (error) {
    throw new Error(
      `No word count file for ${metaPath} at ${wordCountPath}. Try run build lesson command first? ${error}`
    );
  }

  return result;
};

export default readWordCount;
