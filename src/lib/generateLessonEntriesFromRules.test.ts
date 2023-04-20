import generateLessonEntriesFromRules from "./generateLessonEntriesFromRules";

import type { Rules } from "../cli-types";
import type { LookupDictWithNamespacedDicts } from "../shared/types";

const rules: Rules = {
  hasOneConsonantOnEachSide: true,
  isOneSyllable: true,
  hasOnlyOneVowelKey: true,
  isSingleStroke: true,
  hasSimpleStenoKeys: true,
  outlineIsTranslation: true,
  fewerThanFiveCharacters: true,
  hasOneKeyPerFinger: true,
  hasStretchKeys: false,
  hasPhillyShift: false,
  hasInversion: false,
  hasStar: false,
  hasEfAsVeeOrEss: false,
  hasUnstressedVowels: false,
  isBrief: false,
};

describe("generateLessonEntriesFromRules", () => {
  it("creates a list with one syllable words", async () => {
    const lookupDict: LookupDictWithNamespacedDicts = new Map([
      ["was", [["WAS", "typey:typey-type.json"]]],
      ["she", [["SHE", "typey:typey-type.json"]]],
    ]);
    const generatedWords = generateLessonEntriesFromRules(
      lookupDict,
      { isOneSyllable: true },
      []
    );

    expect(generatedWords).toEqual([
      ["WAS", "was"],
      ["SHE", "she"],
    ]);
  });

  it("creates a list with fingerspelled words that may not match final lesson order", async () => {
    const lookupDict: LookupDictWithNamespacedDicts = new Map([
      ["{&A}", [["A*P", "typey:typey-type.json"]]],
      ["{>}{&a}", [["A*", "typey:typey-type.json"]]],
      ["{}", [["WUZ/WUZ", "typey:typey-type.json"]]],
    ]);
    const generatedWords = generateLessonEntriesFromRules(
      lookupDict,
      { isFingerspelled: true },
      [],
      ["a", "A"]
    );

    expect(generatedWords).toEqual([
      ["A*P", "{&A}"],
      ["A*", "{>}{&a}"],
    ]);
  });

  it("creates an introductory list of words", async () => {
    const lookupDict: LookupDictWithNamespacedDicts = new Map([
      ["has", [["HAS", "typey:typey-type.json"]]],
      ["her", [["HER", "typey:typey-type.json"]]],
      ["part", [["PART", "typey:typey-type.json"]]],
      ["put", [["PUT", "typey:typey-type.json"]]],
      ["was", [["WAS", "typey:typey-type.json"]]],
      ["people", [["PAOEPL", "typey:typey-type.json"]]],
      ["thought", [["THAUT", "typey:typey-type.json"]]],
      ["found", [["TPOUPBD", "typey:typey-type.json"]]],
      ["just", [["SKWRUFT", "typey:typey-type.json"]]],
      ["{}", [["WUZ/WUZ", "typey:typey-type.json"]]],
    ]);
    const generatedWords = generateLessonEntriesFromRules(
      lookupDict,
      rules,
      []
    );

    expect(generatedWords).toEqual([
      ["HAS", "has"],
      ["HER", "her"],
      ["PART", "part"],
      ["PUT", "put"],
      ["WAS", "was"],
    ]);
  });

  it("ignore invalid rules", async () => {
    const lookupDict: LookupDictWithNamespacedDicts = new Map([
      ["has", [["HAS", "typey:typey-type.json"]]],
      ["her", [["HER", "typey:typey-type.json"]]],
      ["part", [["PART", "typey:typey-type.json"]]],
      ["put", [["PUT", "typey:typey-type.json"]]],
      ["was", [["WAS", "typey:typey-type.json"]]],
      ["people", [["PAOEPL", "typey:typey-type.json"]]],
      ["thought", [["THAUT", "typey:typey-type.json"]]],
      ["found", [["TPOUPBD", "typey:typey-type.json"]]],
      ["just", [["SKWRUFT", "typey:typey-type.json"]]],
      ["{}", [["WUZ/WUZ", "typey:typey-type.json"]]],
    ]);
    const generatedWords = generateLessonEntriesFromRules(
      lookupDict,
      {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        madeUpRule: true,
        anotherMadeUpRule: false,
        hasOneConsonantOnEachSide: true,
        isOneSyllable: true,
        hasOnlyOneVowelKey: true,
        isSingleStroke: true,
        hasSimpleStenoKeys: true,
      },
      []
    );

    expect(generatedWords).toEqual([
      ["HAS", "has"],
      ["HER", "her"],
      ["PART", "part"],
      ["PUT", "put"],
      ["WAS", "was"],
    ]);
  });
});
