"use strict";

import fs from "node:fs/promises";
import path from "node:path";
import { PerformanceObserver, performance } from "node:perf_hooks";

import buildLessonDict from "../lib/buildLessonDict";
import buildLessonFromWords from "../lib/buildLessonFromWords";
import copyLessonOverview from "../lib/copyLessonOverview";
import makeNonStandardDrillLessonMaterial from "../lib/makeNonStandardDrillLessonMaterial";
import makeNonStandardFundamentalLessonMaterial from "../lib/makeNonStandardFundamentalLessonMaterial";
import makeStandardDrillLessonMaterial from "../lib/makeStandardDrillLessonMaterial";
import makeStandardFundamentalLessonMaterial from "../lib/makeStandardFundamentalLessonMaterial";

import dictionariesDir from "../consts/dictionariesDir";
import lessonSourceDataDir from "../consts/lessonSourceDataDir";
import lessonTargetDataDir from "../consts/lessonTargetDataDir";
import lessonIntermediateDir from "../consts/lessonIntermediateDir";
import standardDictionarySet from "../consts/standardDictionarySet.json";
import standardDictionariesDir from "../consts/standardDictionariesDir";

import checkFileExists from "../utils/checkFileExists";
import createLookupDict from "../lib/createLookupDict";
import slugifyTitle from "../utils/slugifyTitle";
import getLessonType from "../utils/getLessonType";

import type { DictEntries } from "../cli-types";
import type {
  LookupDictWithNamespacedDicts,
  ReadDictionariesData,
  StenoDictionary,
  Translation,
} from "../shared/types";

const intermediateCombinedDictPath =
  "../lesson-intermediate-data/typey-type-standard-dict-set-combined.json";

const standardDictionarySetPaths = standardDictionarySet.map(
  (standardDictName) => `${standardDictionariesDir}/${standardDictName}`
);

type Options = {
  /** e.g. typey-type-data/lessons/collections/user-experience/ux-vocabulary/lesson.txt */
  target: string;
  /** e.g. typey-type-data/lesson-source-data/collections/user-experience/ux-vocabulary/meta.json */
  metadata: string;
};

/**
 * This command builds a lesson according to its metadata and any adjacent files, such as a word list or lesson-overview.html.
 */
const run = async (options: Options) => {
  const measure = options.metadata.replace(lessonSourceDataDir, "");
  const perfObserver = new PerformanceObserver((items) => {
    items.getEntries().forEach((entry) => {
      console.log(
        `⏱  ${entry.duration} ms to build lesson using ${entry.name}`
      );
    });
  });
  perfObserver.observe({ entryTypes: ["measure"], buffered: true });
  performance.mark(`${measure}-start`);

  if (!(await checkFileExists(options.metadata))) {
    throw new Error(
      `Provided lesson metadata file doesn't exist. ${options.metadata}`
    );
  }

  const metaContent = await fs.readFile(options.metadata, "utf8");

  let parsedJSON = null;
  try {
    parsedJSON = JSON.parse(metaContent);
  } catch (error) {
    console.error(
      `Error: there was an error parsing the metadata file ${options.metadata}. `,
      error
    );
  }

  const {
    title,
    recommendedDictionarySet,
    rules,
    presentationOptions,
    translationExclusions,
    vocabulary,
    wordList,
    customMessage,
    ignoredCharacters,
    slug,
  } = parsedJSON;

  const wordListFile = wordList
    ? options.metadata.replace(/meta\.json$/, wordList)
    : undefined;
  const words = wordListFile
    ? (await fs.readFile(wordListFile, "utf8")).split("\n").filter(Boolean)
    : undefined;

  const exclusions: Translation[] = translationExclusions || [];
  let lesson = "";
  let entries: DictEntries = [];
  let transformedEntries: DictEntries = [];
  let vocabLookupDict: LookupDictWithNamespacedDicts | undefined = undefined;

  if (vocabulary?.length > 0) {
    if (!Array.isArray(vocabulary)) {
      // Note: this check is mostly to make types easier to work with below
      throw new Error(
        `The meta.json vocabulary field should be an array but the vocabulary found in ${slug} was not an array.`
      );
    }

    const vocabularyPaths = vocabulary.flatMap((dictPath: string) => {
      if (dictPath === intermediateCombinedDictPath) {
        return standardDictionarySetPaths;
      }

      return `${dictionariesDir}/${dictPath}`;
    });

    const vocabDicts: ReadDictionariesData = await Promise.all(
      vocabularyPaths.map(async (dictFile: string) => {
        const dict = await fs.readFile(dictFile, "utf8");
        const result: [StenoDictionary, string] = [
          JSON.parse(dict),
          path.basename(dictFile),
        ];
        return result;
      })
    ).catch((error) => {
      throw new Error(
        `There was an error reading the vocabulary files. ${error}`
      );
    });
    vocabLookupDict = createLookupDict(vocabDicts);
  }

  let recommendedLookupDict: LookupDictWithNamespacedDicts | undefined =
    undefined;
  let firstRecommendedDict: StenoDictionary | undefined = undefined;
  if (recommendedDictionarySet?.length > 0) {
    const allRecommendedDicts: ReadDictionariesData = await Promise.all(
      recommendedDictionarySet.map(async (dictFile: string) => {
        const dict = await fs.readFile(
          `${dictionariesDir}/${dictFile}`,
          "utf8"
        );
        const allRecommendedDictsResult = [
          JSON.parse(dict),
          path.basename(dictFile),
        ];
        return allRecommendedDictsResult;
      })
    ).catch((error) => {
      throw new Error(
        `There was an error reading the recommended dictionary set. ${error}`
      );
    });

    firstRecommendedDict = allRecommendedDicts[0][0];
    recommendedLookupDict = createLookupDict(allRecommendedDicts);
  }

  const lessonTypeAndData = getLessonType(
    vocabLookupDict,
    recommendedLookupDict,
    firstRecommendedDict,
    rules,
    words,
    title
  );

  switch (lessonTypeAndData.lessonType) {
    case "standardFundamental":
      [entries, transformedEntries] = makeStandardFundamentalLessonMaterial(
        lessonTypeAndData.vocabLookupDict,
        lessonTypeAndData.rules,
        exclusions
      );
      break;

    case "nonStandardFundamental":
      [entries, transformedEntries] = makeNonStandardFundamentalLessonMaterial(
        lessonTypeAndData.recommendedLookupDict,
        lessonTypeAndData.rules,
        exclusions,
        lessonTypeAndData.words
      );
      break;

    case "standardDrill":
      [entries, transformedEntries] = makeStandardDrillLessonMaterial(
        lessonTypeAndData.vocabLookupDict,
        lessonTypeAndData.words,
        // lessons with presentationOptions: "Prefixes", "Suffixes", "Suffixes and prefix briefs"
        presentationOptions || {}
      );
      break;

    case "nonStandardDrill":
      [entries, transformedEntries] = makeNonStandardDrillLessonMaterial(
        lessonTypeAndData.words,
        lessonTypeAndData.firstRecommendedDict
      );
      break;
  }

  lesson = buildLessonFromWords(
    transformedEntries,
    title,
    customMessage || null,
    ignoredCharacters || null
  );

  await copyLessonOverview(options.target);

  await fs.writeFile(options.target, lesson).catch((err) => {
    if (err) {
      console.error(err);
    }
  });

  const lessonDict = await buildLessonDict(entries);

  const lessonDictTarget = options.target.replace(
    /lesson\.txt$/,
    `${slug ? slug : slugifyTitle(title)}.json`
  );

  await fs.writeFile(lessonDictTarget, lessonDict).catch((err) => {
    if (err) {
      console.error(err);
    }
  });

  const wordCountText = `${entries.length}`;
  const lessonWordCountTarget = options.target
    .replace(lessonTargetDataDir, lessonIntermediateDir)
    .replace("/lesson.txt", "/word-count.txt");

  const existingWordCountText = await fs
    .readFile(lessonWordCountTarget, "utf8")
    .catch(() => ""); // For first build of word count file for first build of lesson

  if (existingWordCountText !== wordCountText) {
    await fs.writeFile(lessonWordCountTarget, wordCountText).catch((err) => {
      console.error(err);
    });
  }

  performance.mark(`${measure}-end`);
  performance.measure(`${measure}`, `${measure}-start`, `${measure}-end`);
};

export default {
  run,
};
