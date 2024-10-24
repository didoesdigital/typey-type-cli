import type { NewEmojiStrategy, PreviousEmojiStrategy } from "../lib/stemoji";

const convertNewEmojiStrategyToPrevious = (
  emojisInNewStrategyFormat: NewEmojiStrategy
): PreviousEmojiStrategy => {
  const newEntries = Object.entries(emojisInNewStrategyFormat);
  const result: PreviousEmojiStrategy = {};
  for (const [unicode_output, newEntry] of newEntries) {
    result[newEntry.shortname.replace(/:/g, "")] = {
      unicode: unicode_output,
      shortname: newEntry.shortname,
      aliases: newEntry.shortname_alternates.join(" "),
      keywords: newEntry.keywords.join(" "),
    };
  }

  return result;
};

export default convertNewEmojiStrategyToPrevious;
