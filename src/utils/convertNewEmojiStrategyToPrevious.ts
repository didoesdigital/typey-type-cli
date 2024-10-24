import type { NewEmojiStrategy, PreviousEmojiStrategy } from "../lib/stemoji";

const convertNewEmojiStrategyToPrevious = (
  emojisInNewStrategyFormat: NewEmojiStrategy
): PreviousEmojiStrategy => {
  const newEntries = Object.entries(emojisInNewStrategyFormat);
  const result: PreviousEmojiStrategy = {};
  for (const [unicode_output, newEntry] of newEntries) {
    if (
      newEntry.shortname.match(/_tone[0-9]:/) !== null &&
      newEntry.shortname_alternates.length > 0
    ) {
      const shortname =
        // Handle exceptions for thumbs up/down emoji `+1` and `-1` shortname alternates:
        newEntry.shortname_alternates[0].startsWith(":+") ||
        newEntry.shortname_alternates[0].startsWith(":-")
          ? newEntry.shortname_alternates[1]
          : newEntry.shortname_alternates[0];

      const newKey = shortname.replace(/:/g, "");
      result[newKey] = {
        unicode: unicode_output,
        shortname: shortname,
        aliases: newEntry.shortname_alternates.slice(1).join(" "),
        keywords: newEntry.keywords.join(" "),
      };
    } else {
      const newKey = newEntry.shortname.replace(/:/g, "");
      result[newKey] = {
        unicode: unicode_output,
        shortname: newEntry.shortname,
        aliases: newEntry.shortname_alternates.join(" "),
        keywords: newEntry.keywords.join(" "),
      };
    }
  }

  return result;
};

export default convertNewEmojiStrategyToPrevious;
