"use strict";

import fs from "node:fs/promises";

import lessonTargetDataDir from "../consts/lessonTargetDataDir";
import { StenoDictionary } from "src/shared/types";

const longestSingleStrokeTarget = `${lessonTargetDataDir}/drills/longest-words-with-single-stroke-briefs/longest-words-with-single-stroke-briefs.json`;
const singleStrokeTarget = `${lessonTargetDataDir}/drills/single-stroke-briefs/single-stroke-briefs.json`;

/**
 * This command does common checks on lessons like single-stroke lessons should have only single-stroke outlines
 */
const run = async () => {
  const singleStrokeLessons = [singleStrokeTarget, longestSingleStrokeTarget];

  singleStrokeLessons.forEach(async (singleStrokeLesson) => {
    const sourceContent = await fs.readFile(singleStrokeLesson, "utf8");

    let dict: null | StenoDictionary = null;
    try {
      dict = JSON.parse(sourceContent);
    } catch (error) {
      console.error(
        `Error: there was an error parsing the lesson file for validation. `,
        error
      );
    }

    if (dict === null) {
      console.error(
        `Found null dictionary validating lesson: ${singleStrokeLesson}`
      );

      throw new Error(
        `❌ Single-stroke lessons should have dictionary files to validate. `
      );
    }

    for (const [outline, translation] of Object.entries(dict)) {
      if (outline.includes("/")) {
        const filename = singleStrokeLesson.replace(/.*\//, "");
        console.error(
          `❌ ${filename} contains multi-stroke outline: ${outline}: ${translation}`
        );
        throw new Error(
          `❌ Single-stroke lessons should not have multi-stroke outlines. `
        );
      }
    }
  });

  console.log("✅ Single-stroke lessons validated. Looks Good To Me!");
};

export default {
  run,
};
