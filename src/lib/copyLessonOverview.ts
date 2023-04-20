"use strict";

import fs from "node:fs/promises";

import checkFileExists from "../utils/checkFileExists";
import lessonSourceDataDir from "../consts/lessonSourceDataDir";
import lessonTargetDataDir from "../consts/lessonTargetDataDir";

const lessonOverviewFilename = "lesson-overview.html";

const copyLessonOverview = async (target: string) => {
  const targetOverview = target.replace("lesson.txt", lessonOverviewFilename);
  const sourceOverview = targetOverview.replace(
    lessonTargetDataDir,
    lessonSourceDataDir
  );

  if (await checkFileExists(sourceOverview)) {
    try {
      await fs.copyFile(sourceOverview, targetOverview);
    } catch {
      console.error(`Unable to copy lesson overview: ${sourceOverview}`);
    }
  }
};

export default copyLessonOverview;
