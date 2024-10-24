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

  it("takes new emoji strategy with flag emoji and returns previous strategy format", async () => {
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

  it("takes new emoji strategy with skin tone emoji 💇🏻 and returns previous strategy format", async () => {
    const input: NewEmojiStrategy = {
      "1f487-1f3fb": {
        "name": "person getting haircut: light skin tone",
        "category": "people",
        "shortname": ":person_getting_haircut_tone1:",
        "shortname_alternates": [":haircut_tone1:"],
        "keywords": [
          "barber",
          "beauty",
          "haircut",
          "light skin tone",
          "parlor",
          "uc8",
        ],
        "unicode_output": "1f487-1f3fb",
      },
    };
    const expected: PreviousEmojiStrategy = {
      "haircut_tone1": {
        "unicode": "1f487-1f3fb",
        "shortname": ":haircut_tone1:",
        "aliases": "",
        // The old emoji strategy file had this value for the keywords property:
        // "keywords": "haircut tone 1 female girl woman",
        "keywords": "barber beauty haircut light skin tone parlor uc8",
      },
    };
    expect(convertNewEmojiStrategyToPrevious(input)).toEqual(expected);
  });

  it("takes new emoji strategy with skin tone emoji and aliases 🏋🏻 and returns previous strategy format", async () => {
    const input: NewEmojiStrategy = {
      "1f3cb-1f3fb": {
        "name": "person lifting weights: light skin tone",
        "category": "activity",
        "shortname": ":person_lifting_weights_tone1:",
        "shortname_alternates": [":lifter_tone1:", ":weight_lifter_tone1:"],
        "keywords": ["lifter", "light skin tone", "weight", "uc8"],
        "unicode_output": "1f3cb-1f3fb",
      },
    };
    const expected: PreviousEmojiStrategy = {
      "lifter_tone1": {
        "unicode": "1f3cb-1f3fb",
        "shortname": ":lifter_tone1:",
        "aliases": ":weight_lifter_tone1:",
        // The old emoji strategy file had this value for the keywords property:
        // "keywords": "weight lifter tone 1 bench press squats deadlift",
        "keywords": "lifter light skin tone weight uc8",
      },
    };
    expect(convertNewEmojiStrategyToPrevious(input)).toEqual(expected);
  });

  it("takes new emoji strategy with thumbs up and returns previous strategy format", async () => {
    const input: NewEmojiStrategy = {
      "1f44d": {
        "name": "thumbs up",
        "category": "people",
        "shortname": ":thumbsup:",
        "shortname_alternates": [":+1:", ":thumbup:", ":thumbs_up:"],
        "keywords": ["+1", "hand", "thumb", "up", "uc6"],
        "unicode_output": "1f44d",
      },
    };
    const expected: PreviousEmojiStrategy = {
      "thumbsup": {
        "unicode": "1f44d",
        "shortname": ":thumbsup:",
        // The old emoji strategy file had these values for the aliases and
        // keywords properties:
        // "aliases": ":+1:",
        // "keywords":
        //   "thumbs up sign cool hand like yes +1 body person thumb thumbs up",
        "aliases": ":+1: :thumbup: :thumbs_up:",
        "keywords": "+1 hand thumb up uc6",
      },
    };
    expect(convertNewEmojiStrategyToPrevious(input)).toEqual(expected);
  });
});
