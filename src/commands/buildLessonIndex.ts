"use strict";

import fs from "node:fs/promises";
import { PerformanceObserver, performance } from "node:perf_hooks";

import lessonSourceDataDir from "../consts/lessonSourceDataDir";
import lessonIndexSource from "../consts/lessonIndexSource";
import lessonIndexTarget from "../consts/lessonIndexTarget";
import readWordCount from "../lib/readWordCount";
import checkFileExists from "../utils/checkFileExists";

import type { ParsedMeta } from "../cli-types";

const defaultSuggestedNext =
  "/drills/top-10000-project-gutenberg-words/lesson.txt";

/**
 * This command builds the lesson index file used by Typey Type to track the order of lessons and info about each lesson, such as the pretty lesson title, word count, and suggested next lesson.
 */
const run = async () => {
  const measure = "lesson-index";
  const perfObserver = new PerformanceObserver((items) => {
    items.getEntries().forEach((entry) => {
      console.log(
        `⏱  ${entry.duration} ms to build lesson index using ${lessonIndexSource}`
      );
    });
  });
  perfObserver.observe({ entryTypes: ["measure"], buffered: true });
  performance.mark(`${measure}-start`);

  const sourceContent = await fs.readFile(lessonIndexSource, "utf8");

  let listOfLessons: null | string[] = null;
  try {
    listOfLessons = JSON.parse(sourceContent);
  } catch (error) {
    console.error(
      `Error: there was an error parsing the source lesson index file. `,
      error
    );
  }

  const missingMetaFiles: string[] = [];
  if (listOfLessons) {
    const allMeta: ParsedMeta[] = (
      await Promise.all(
        listOfLessons.map(async (categorySubcategoryTitle: string) => {
          const metaPath = `${lessonSourceDataDir}/${categorySubcategoryTitle}/meta.json`;
          if (!(await checkFileExists(metaPath))) {
            missingMetaFiles.push(metaPath);
            return null;
          }
          const metaContents = await fs.readFile(metaPath, "utf8");
          return JSON.parse(metaContents);
        })
      ).catch((error) => {
        throw new Error(
          `There was an error reading the meta files to build the lesson index. ${error}`
        );
      })
    ).filter(Boolean); // Exclude missing meta files

    if (missingMetaFiles.length > 0) {
      console.error({ missingMetaFiles });
      throw new Error(
        "The source lesson index includes lessons that don't have matching meta.json files."
      );
    }

    const targetIndex = await Promise.all(
      allMeta.map(async (meta, index) => {
        const wordCount = await readWordCount(meta.path);

        const overviewPath = `${lessonSourceDataDir}/${meta.path
          .replace("/", "")
          .replace("lesson.txt", "lesson-overview.html")}`;
        const overview = (await checkFileExists(overviewPath))
          ? { overview: overviewPath.replace(lessonSourceDataDir, "") }
          : undefined;

        const result = {
          title: meta.title,
          subtitle: "",
          category: meta.category,
          subcategory: meta.subcategory,
          path: meta.path,
          wordCount,
          ...overview,
          suggestedNext:
            index === allMeta.length - 1
              ? defaultSuggestedNext
              : allMeta[index + 1].path,
        };

        return result;
      })
    );

    await fs
      .writeFile(lessonIndexTarget, JSON.stringify(targetIndex, null, 2))
      .catch((err) => {
        if (err) {
          console.error(err);
        }
      });
  }

  performance.mark(`${measure}-end`);
  performance.measure(`${measure}`, `${measure}-start`, `${measure}-end`);
};

export default {
  run,
};
