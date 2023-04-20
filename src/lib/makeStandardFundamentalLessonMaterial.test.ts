import makeStandardFundamentalLessonMaterial from "./makeStandardFundamentalLessonMaterial";
import type { LookupDictWithNamespacedDicts } from "../shared/types";

describe("makeStandardFundamentalLessonMaterial", () => {
  it("returns standard fundamental lesson material", async () => {
    const vocabLookupDict: LookupDictWithNamespacedDicts = new Map([
      ["the", [["-T", "typey:typey-type.json"]]],
      ["of", [["-F", "typey:typey-type.json"]]],
      ["and", [["SKP", "typey:typey-type.json"]]],
      ["was", [["WAS", "typey:typey-type.json"]]],
      ["her", [["HER", "typey:typey-type.json"]]],
      ["has", [["HAS", "typey:typey-type.json"]]],
    ]);
    const exclusions: string[] = [];
    const lessonTypeAndData = {
      lessonType: "standardFundamental",
      vocabLookupDict,
      rules: {
        "hasOneConsonantOnEachSide": true,
        "isOneSyllable": true,
        "hasOnlyOneVowelKey": true,
        "isSingleStroke": true,
        "hasSimpleStenoKeys": true,
        "outlineIsTranslation": true,
        "fewerThanFiveCharacters": true,
        "hasOneKeyPerFinger": true,
        "hasStretchKeys": false,
        "hasPhillyShift": false,
        "hasInversion": false,
        "hasStar": false,
        "hasEfAsVeeOrEss": false,
        "hasUnstressedVowels": false,
        "isBrief": false,
      },
    };

    const [entries, transformedEntries] = makeStandardFundamentalLessonMaterial(
      lessonTypeAndData.vocabLookupDict,
      lessonTypeAndData.rules,
      exclusions
    );

    expect(entries).toEqual([
      ["WAS", "was"],
      ["HER", "her"],
      ["HAS", "has"],
    ]);

    expect(transformedEntries).toEqual([
      ["WAS", "was"],
      ["HER", "her"],
      ["HAS", "has"],
    ]);
  });
});
