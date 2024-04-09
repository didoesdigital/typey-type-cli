"use strict";

import fs from "node:fs/promises";

import lessonTargetDataDir from "../consts/lessonTargetDataDir";
import { StenoDictionary } from "src/shared/types";

const longestSingleStrokeTarget = `${lessonTargetDataDir}/drills/longest-words-with-single-stroke-briefs/longest-words-with-single-stroke-briefs.json`;

/**
 * This command does common checks on lessons like single-stroke lessons should have only single-stroke outlines
 */
const run = async () => {
  const sourceContent = await fs.readFile(longestSingleStrokeTarget, "utf8");

  let longestSingleStrokeLessonDict: null | StenoDictionary = null;
  try {
    longestSingleStrokeLessonDict = JSON.parse(sourceContent);
  } catch (error) {
    console.error(
      `Error: there was an error parsing the source dictionaries index file. `,
      error
    );
  }

  if (longestSingleStrokeLessonDict === null) {
    console.error("Longest single-stroke briefs lesson dictionary is null");
    return;
  }

  for (const [outline, translation] of Object.entries(
    longestSingleStrokeLessonDict
  )) {
    if (outline.includes("/")) {
      throw new Error(
        `❌ Longest Words with Single-Stroke Briefs lesson contains multi-stroke outline: ${outline}: ${translation}`
      );
    }
  }

  console.log("✅ Lessons validated. Looks Good To Me!");
};

export default {
  run,
};
