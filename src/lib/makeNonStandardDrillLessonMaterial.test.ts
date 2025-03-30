import AFFIXES from "../shared/utils/affixes/affixes";
import loadAffixes from "../lib/loadAffixesFromFile";
import makeNonStandardDrillLessonMaterial from "./makeNonStandardDrillLessonMaterial";
import type { StenoDictionary } from "../shared/types";

describe("makeNonStandardDrillLessonMaterial", () => {
  beforeAll(() => {
    AFFIXES.setLoadFunction(loadAffixes);
  });

  it("returns non-standard drill lesson material", async () => {
    // const recommendedLookupDict: LookupDictWithNamespacedDicts = new Map([
    //   ["it", [["KPWH", "typey:typey-type.json"]]],
    //   ["it doesn't like the", [["KPWH*EBLGT", "typey:typey-type.json"]]],
    //   ["it could", [["KPWH-BGD", "typey:typey-type.json"]]],
    //   ["it can't", [["KPWH-BGT", "typey:typey-type.json"]]],
    //   ["it believe", [["KPWH-BL", "typey:typey-type.json"]]],
    //   ["it doesn't understand", [["KPWHERPBD", "typey:typey-type.json"]]],
    //   ["it can't", [["KPWHO", "typey:typey-type.json"]]],
    //   ["it don't", [["KPWHOE", "typey:typey-type.json"]]],
    // ]);
    const firstRecommendedDict: StenoDictionary = {
      "KPWH": "it",
      "KPWH*EBLGT": "it doesn't like the",
      "KPWH-BGD": "it could",
      "KPWH-BGT": "it can't",
      "KPWH-BL": "it believe",
      "KPWHERPBD": "it doesn't understand",
      "KPWHO": "it can't",
      "KPWHOE": "it don't",
    };
    const words = [
      "it",
      "it could",
      "it can't",
      "it believe",
      "it can't",
      "it don't",
    ];
    const lessonTypeAndData = {
      lessonType: "nonStandardDrill",
      firstRecommendedDict,
      words,
    };

    const [entries, transformedEntries] = makeNonStandardDrillLessonMaterial(
      lessonTypeAndData.words,
      lessonTypeAndData.firstRecommendedDict
    );

    expect(entries).toEqual([
      ["KPWH", "it"],
      ["KPWH-BGD", "it could"],
      ["KPWH-BGT", "it can't"],
      ["KPWH-BL", "it believe"],
      ["KPWHO", "it can't"],
      ["KPWHOE", "it don't"],
    ]);

    expect(transformedEntries).toEqual([
      ["KPWH", "it"],
      ["KPWH-BGD", "it could"],
      ["KPWH-BGT", "it can't"],
      ["KPWH-BL", "it believe"],
      ["KPWHO", "it can't"],
      ["KPWHOE", "it don't"],
    ]);
  });
});
