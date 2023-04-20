#!/usr/bin/env node
"use strict";

import buildLesson from "./commands/buildLesson";
import buildLessonIndex from "./commands/buildLessonIndex";
import copyDictionaries from "./commands/copyDictionaries";
import buildRecommendationsCourses from "./commands/buildRecommendationsCourses";
import buildTypeyTypeDictionary from "./commands/buildTypeyTypeDictionary";
import addNewRule from "./commands/addNewRule";
import splitLessonIndex from "./commands/splitLessonIndex";

import { Command } from "commander";

async function main() {
  const program = new Command();

  program.version("0.0.1");

  program
    .command("build-lesson")
    .description("Builds a lesson according to its metadata")
    .requiredOption(
      "--metadata <filePath>",
      "The lesson metadata source file path"
    )
    .requiredOption(
      "--target <filePath>",
      "The target file path to build the lesson"
    )
    .action(buildLesson.run);

  program
    .command("build-lesson-index")
    .description("Builds the lesson index")
    .action(buildLessonIndex.run);

  program
    .command("copy-dictionaries")
    .description("Copies source dictionaries to target dictionaries")
    .action(copyDictionaries.run);

  program
    .command("build-recommendations-courses")
    .description("Builds recommendations courses for lessons and flashcards")
    .action(buildRecommendationsCourses.run);

  program
    .command("build-typey-type-dictionary")
    .description("Builds Typey Type dictionaries")
    .requiredOption(
      "--target <filePath>",
      "The target file path to build the lesson"
    )
    .action(buildTypeyTypeDictionary.run);

  program
    .command("add-new-rule")
    .description("Scaffolds files for new rules for fundamental lessons")
    .requiredOption("--rule <ruleName>", "camelCase rule name")
    .action(addNewRule.run);

  program
    .command("split-lesson-index", { hidden: true })
    .description("Splits meta files from lesson index")
    .action(splitLessonIndex.run);

  await program.parseAsync(process.argv);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
