#!/usr/bin/env node
"use strict";

import { Command } from "commander";
import buildLesson from "./commands/buildLesson";
import buildLessonIndex from "./commands/buildLessonIndex";
import checkDuplicateOutlines from "./commands/checkDuplicateOutlines";
import checkForFingerspelledStrokes from "./commands/checkForFingerspelledStrokes";
import copyDictionaries from "./commands/copyDictionaries";
import validateLessons from "./commands/validateLessons";
import buildRecommendationsCourses from "./commands/buildRecommendationsCourses";
import buildTypeyTypeDictionary from "./commands/buildTypeyTypeDictionary";
import buildEmojiDictionary from "./commands/buildEmojiDictionary";
import buildEmojiStrategy from "./commands/buildEmojiStrategy";
import addNewRule from "./commands/addNewRule";
import splitLessonIndex from "./commands/splitLessonIndex";
import affixes from "./shared/utils/affixes/affixes";
import loadAffixes from "./lib/loadAffixesFromFile";

// Note: we *could* set the load function only in the modules of the commands
// that need it (building Typey Type dictionary and building fundamental and
// drill lessons). This is simpler for now.
affixes.setLoadFunction(loadAffixes);

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
      "The target file path to build the dictionary"
    )
    .action(buildTypeyTypeDictionary.run);

  program
    .command("build-emoji-dictionary")
    .description("Builds an emoji dictionary")
    .requiredOption(
      "--target <filePath>",
      "The target file path to build the dictionary"
    )
    .action(buildEmojiDictionary.run);

  program
    .command("build-emoji-strategy")
    .description("Builds emoji strategy for building emoji dictionary")
    .action(buildEmojiStrategy.run);

  program
    .command("add-new-rule")
    .description("Scaffolds files for new rules for fundamental lessons")
    .requiredOption("--rule <ruleName>", "camelCase rule name")
    .action(addNewRule.run);

  program
    .command("validate-lessons")
    .description(
      "Runs basic checks on lesson files to make sure they are as expected"
    )
    .action(validateLessons.run);

  program
    .command("split-lesson-index", { hidden: true })
    .description("Splits meta files from lesson index")
    .action(splitLessonIndex.run);

  program
    .command("check-duplicate-outlines")
    .description("Checks for outlines duplicated across dictionaries")
    .option(
      "-u, --unique-translations",
      "show only duplicate outlines with differing translations"
    )
    .action(checkDuplicateOutlines.run);

  program
    .command("check-for-fingerspelled-strokes")
    .description(
      "Checks given dictionaries for outlines containing only fingerspelled strokes"
    )
    .argument("<dictionary_paths...>", "dictionaries to check")
    .action(checkForFingerspelledStrokes.run);

  await program.parseAsync(process.argv);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
