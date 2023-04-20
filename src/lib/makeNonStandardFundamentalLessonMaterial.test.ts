import makeNonStandardFundamentalLessonMaterial from "./makeNonStandardFundamentalLessonMaterial";
import type { LookupDictWithNamespacedDicts } from "../shared/types";

describe("makeNonStandardFundamentalLessonMaterial", () => {
  it("returns non-standard fundamental lesson material", async () => {
    const recommendedLookupDict: LookupDictWithNamespacedDicts = new Map([
      ["I", [["1-R", "typey:typey-type.json"]]],
      ["II", [["2-R", "typey:typey-type.json"]]],
      ["III", [["3-R", "typey:typey-type.json"]]],
      ["IV", [["4-R", "typey:typey-type.json"]]],
      ["V", [["5R", "typey:typey-type.json"]]],
      ["VI", [["R-6", "typey:typey-type.json"]]],
      ["VII", [["R-7", "typey:typey-type.json"]]],
      ["VIII", [["R-8", "typey:typey-type.json"]]],
      ["IX", [["R-9", "typey:typey-type.json"]]],
      ["X", [["10R", "typey:typey-type.json"]]],
      ["XI", [["1-RD", "typey:typey-type.json"]]],
      ["XII", [["12-R", "typey:typey-type.json"]]],
    ]);
    const exclusions: string[] = [];
    const lessonTypeAndData = {
      lessonType: "nonStandardFundamental",
      recommendedLookupDict,
      rules: {
        "isRomanNumeral": true,
      },
      words: ["I", "II", "V", "X"],
    };

    const [entries, transformedEntries] =
      makeNonStandardFundamentalLessonMaterial(
        lessonTypeAndData.recommendedLookupDict,
        lessonTypeAndData.rules,
        exclusions,
        lessonTypeAndData.words
      );

    expect(entries).toEqual([
      ["1-R", "I"],
      ["2-R", "II"],
      ["5R", "V"],
      ["10R", "X"],
    ]);

    expect(transformedEntries).toEqual([
      ["1-R", "I"],
      ["2-R", "II"],
      ["5R", "V"],
      ["10R", "X"],
    ]);
  });
});
