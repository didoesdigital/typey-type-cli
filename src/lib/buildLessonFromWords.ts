"use strict";
import type { DictEntries } from "../cli-types";

/*
 * Builds a formatted lesson
 */
const buildLessonFromWords = (
  entries: DictEntries,
  title: string,
  customMessage: string | null,
  ignoredCharacters: string | null
) => {
  const flagIgnoredCharacters = ignoredCharacters
    ? `
ignore_characters='${ignoredCharacters}'`
    : "";

  const flagCustomMessage = customMessage
    ? `
warning_message=${customMessage}`
    : "";

  const extraSettings = `${flagIgnoredCharacters}${flagCustomMessage}`;

  const lesson = `${title}

${entries.map((line) => `'${line[1]}': ${line[0]}`).join("\n")}${extraSettings}
`;

  return lesson;
};

export default buildLessonFromWords;
