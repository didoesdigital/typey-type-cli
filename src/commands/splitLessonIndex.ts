"use strict";

import fs from "node:fs/promises";

import lessonSourceDataDir from "../consts/lessonSourceDataDir";
import lessonIndexPath from "../consts/lessonIndexPath";

import type {
  PrettyLessonTitle,
  Category,
  Subcategory,
  LessonPathWithoutBasenameAndWithFilename,
} from "../cli-types";

type ParsedLessonIndexMeta = {
  title: PrettyLessonTitle;
  subtitle: "";
  category: Category;
  subcategory: Subcategory;
  path: LessonPathWithoutBasenameAndWithFilename;
  wordCount: number;
  /** e.g. "/fundamentals/introduction/lesson-overview.html" */
  overview: string;
  /** e.g. "/fundamentals/one-syllable-words-with-simple-keys/lesson.txt" */
  suggestedNext: string;
};

// const sourceWordListDir =
//   "../plover-tools/typey-type-static-lesson-generator/source-word-lists";

/**
 * splitLessonIndex.run() is a temporary command to split the existing lesson index file into a series of meta files to use in the new CLI. It also has code for copying over word lists. It may be deleted in the future.
 *
 * @deprecated This is no longer a supported command.
 */
const run = async () => {
  const lessonIndex = await fs.readFile(lessonIndexPath, "utf8");

  let parsedJSON = null;
  try {
    parsedJSON = JSON.parse(lessonIndex);
  } catch (error) {
    throw new Error(
      `Error: there was an error parsing the lesson index. ${error}`
    );
  }

  // THIS SECTION WAS USED FOR STORIES AND COLLECTIONS
  parsedJSON
    .filter(
      (lessonMeta: ParsedLessonIndexMeta) =>
        !lessonMeta.path.includes("fundamentals") &&
        !lessonMeta.path.includes("drills")
    )
    .forEach(async (lessonMeta: ParsedLessonIndexMeta) => {
      /** e.g. "faux-typey-type-data/lesson-source-data/stories/proverbs/proverbs-starting-with-a/meta.json" */
      const metaPath =
        lessonSourceDataDir +
        lessonMeta.path.replace("lesson.txt", "meta.json");

      /** e.g. "faux-typey-type-data/lesson-source-data/stories/proverbs/proverbs-starting-with-a/" */
      const newSourceFilesDir = metaPath.replace("meta.json", "");

      // NOTE: we've already created the meta files, let's pause this now
      // const metaContentsJSON = {
      //   title: lessonMeta.title,
      //   subtitle: lessonMeta.subtitle,
      //   category: lessonMeta.category,
      //   subcategory: lessonMeta.subcategory,
      //   path: lessonMeta.path,
      //   wordList: "words.txt",
      //   vocabulary: [
      //     "../lesson-intermediate-data/typey-type-standard-dict-set-combined.json",
      //   ],
      // };
      // const metaContents = JSON.stringify(metaContentsJSON, null, 2);

      if (await fs.stat(newSourceFilesDir).catch(() => false)) {
        console.log(`Already exists: ${newSourceFilesDir}`);
      } else {
        await fs.mkdir(newSourceFilesDir, { recursive: true });
        console.log(`Made: ${newSourceFilesDir}`);
      }

      // NOTE: we've already created the word list files, let's pause this now
      // const wordListPath = `${sourceWordListDir}${lessonMeta.path.replace(
      //   "/lesson.txt",
      //   ""
      // )}/${lessonMeta.path.replace("/lesson.txt", "").replace(/.*\//, "")}.md`;
      // const targetWordListPath = metaPath.replace("meta.json", "words.txt");
      // await fs.copyFile(wordListPath, targetWordListPath).catch((err) => {
      //   throw new Error(
      //     `Error: there was an error copying the word list file over for ${metaPath}. ${err}`
      //   );
      // });

      // NOTE: we've already created the meta files, let's pause this now
      // await fs.writeFile(metaPath, metaContents).catch((err) => {
      //   if (err) {
      //     console.error(err);
      //   }
      // });
    });

  // THIS SECTION WAS USED FOR FUNDAMENTALS:
  // const lessonIndexRules = await fs.readFile(
  //   "src/consts/lessonIndexRules.json",
  //   "utf8"
  // );

  // let parsedRulesJSON: any = null;
  // try {
  //   parsedRulesJSON = JSON.parse(lessonIndexRules);
  // } catch (error) {
  //   throw new Error(
  //     `Error: there was an error parsing the lesson index rules. ${error}`
  //   );
  // }

  // parsedJSON
  //   .filter(
  //     (lessonMeta: any) =>
  //       lessonMeta.path.includes("fundamentals") &&
  //       !lessonMeta.path.includes("roman")
  //   )
  //   .forEach(async (lessonMeta: any) => {
  //     /** e.g. "faux-typey-type-data/lesson-source-data/fundamentals/introduction/meta.json" */
  //     const path =
  //       lessonSourceDataDir +
  //       lessonMeta.path.replace("lesson.txt", "meta.json");

  //     /** e.g. "introduction" */
  //     const slug = lessonMeta.path
  //       .replace("/fundamentals/", "")
  //       .replace("/lesson.txt", "");

  //     if (!parsedRulesJSON[slug]) {
  //       throw new Error("No matching rules");
  //     }

  //     const metaContentsJSON = {
  //       title: lessonMeta.title,
  //       subtitle: lessonMeta.subtitle,
  //       category: lessonMeta.category,
  //       subcategory: lessonMeta.subcategory,
  //       path: lessonMeta.path,
  //       vocabulary: ["didoesdigital/top-10000-project-gutenberg-words.json"],
  //       rules: parsedRulesJSON[slug],
  //     };

  //     const metaContents = JSON.stringify(metaContentsJSON, null, 2);

  //     const dir = `${lessonSourceDataDir}/fundamentals/${slug}`;
  //     if (await fs.stat(dir).catch(() => false)) {
  //       console.log(`Already exists: ${dir}`);
  //     } else {
  //       await fs.mkdir(dir);
  //       console.log(`Made: ${dir}`);
  //     }

  //     await fs.writeFile(path, metaContents).catch((err) => {
  //       if (err) {
  //         console.error(err);
  //       }
  //     });
  //   });
};

export default {
  run,
};
