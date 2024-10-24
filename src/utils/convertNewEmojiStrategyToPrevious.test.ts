import convertNewEmojiStrategyToPrevious from "./convertNewEmojiStrategyToPrevious";
import { NewEmojiStrategy, PreviousEmojiStrategy } from "../lib/stemoji";

describe("convertNewStrategyToPrevious", () => {
  it("takes new emoji strategy with simple emoji and returns previous strategy format", async () => {
    const input: NewEmojiStrategy = {
      "1f600": {
        name: "grinning face",
        category: "people",
        shortname: ":grinning:",
        shortname_alternates: [":grinning_face:"],
        keywords: ["face", "grin", "uc6"],
        unicode_output: "1f600",
      },
    };

    const expected: PreviousEmojiStrategy = {
      "grinning": {
        unicode: "1f600",
        shortname: ":grinning:",
        // The old emoji strategy file had this value for the aliases property: ""
        aliases: ":grinning_face:",
        keywords: "face grin uc6",
        // The old emoji strategy file had this value for the keywords property:
        // "grinning face happy joy smile grin smiling smiley person"
      },
    };

    expect(convertNewEmojiStrategyToPrevious(input)).toEqual(expected);
  });

  it("takes new emoji strategy with simple emoji and returns previous strategy format", async () => {
    const input: NewEmojiStrategy = {
      "1f1f8-1f1f9": {
        "name": "flag: S\u00e3o Tom\u00e9 &amp; Pr\u00edncipe",
        "category": "flags",
        "shortname": ":flag_st:",
        "shortname_alternates": [":st:"],
        "keywords": ["flag", "uc6"],
        "unicode_output": "1f1f8-1f1f9",
      },
    };
    const expected: PreviousEmojiStrategy = {
      "flag_st": {
        "unicode": "1f1f8-1f1f9",
        "shortname": ":flag_st:",
        "aliases": ":st:",
        // The old emoji strategy file had this value for the keywords property:
        // "s\u00e3o tom\u00e9 and pr\u00edncipe country nation st flag other pr\u00edncipe sao tome",
        "keywords": "flag uc6",
      },
    };
    expect(convertNewEmojiStrategyToPrevious(input)).toEqual(expected);
  });
});
