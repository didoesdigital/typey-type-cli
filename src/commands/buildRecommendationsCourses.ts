"use strict";

import fs from "node:fs/promises";
import { PerformanceObserver, performance } from "node:perf_hooks";

import lessonSourceDataDir from "../consts/lessonSourceDataDir";
import lessonTargetDataDir from "../consts/lessonTargetDataDir";

const lessonRecommendationsSource = `${lessonSourceDataDir}/recommendations.json`;
const lessonRecommendationsTarget = `${lessonTargetDataDir}/recommendations.json`;
const flashcardsRecommendationsSource = `${lessonSourceDataDir}/flashcardsRecommendations.json`;
const flashcardsRecommendationsTarget = `${lessonTargetDataDir}/flashcardsRecommendations.json`;

/**
 * This command builds recommendations.json for lessons and flashcardsRecommendations.json
 *
 * Ideally the courses would be generated but for now we'll copy static source files.
 *
 */
const run = async () => {
  const measure = "build-recommendations-courses";
  const perfObserver = new PerformanceObserver((items) => {
    items.getEntries().forEach((entry) => {
      console.log(`⏱  ${entry.duration} ms to build recommendations courses`);
    });
  });
  perfObserver.observe({ entryTypes: ["measure"], buffered: true });
  performance.mark(`${measure}-start`);

  try {
    // console.log({ lessonRecommendationsSource, lessonRecommendationsTarget });
    await fs.copyFile(lessonRecommendationsSource, lessonRecommendationsTarget);
  } catch (error) {
    console.error(
      `Unable to copy recommendations course: ${lessonRecommendationsSource}.`,
      error
    );
  }

  try {
    // console.log({
    //   flashcardsRecommendationsSource,
    //   flashcardsRecommendationsTarget,
    // });
    await fs.copyFile(
      flashcardsRecommendationsSource,
      flashcardsRecommendationsTarget
    );
  } catch (error) {
    console.error(
      `Unable to copy recommendations course: ${flashcardsRecommendationsSource}.`,
      error
    );
  }

  performance.mark(`${measure}-end`);
  performance.measure(`${measure}`, `${measure}-start`, `${measure}-end`);
};

export default {
  run,
};
