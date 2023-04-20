import makeStandardDrillLessonMaterial from "./makeStandardDrillLessonMaterial";
import type { LookupDictWithNamespacedDicts } from "../shared/types";

describe("makeStandardDrillLessonMaterial", () => {
  it("returns standard drill lesson material with no presentation options", async () => {
    const vocabLookupDict: LookupDictWithNamespacedDicts = new Map([
      ["14", [["14", "typey:typey-type.json"]]],
      ["DevOps", [["TK-F/OPS", "typey:typey-type.json"]]],
      ["hello", [["H-L", "typey:typey-type.json"]]],
      ["adventurous", [["SREPBG/ROUS", "typey:typey-type.json"]]],
      ["afraid", [["A/TPRAEUD", "typey:typey-type.json"]]],
      ["anxious", [["KPUS", "typey:typey-type.json"]]],
      ["at ease", [["AT/AOEZ", "typey:typey-type.json"]]],
      ["bellicose", [["PWEL/KOES", "typey:typey-type.json"]]],
    ]);
    const words = ["adventurous", "afraid", "anxious", "at ease", "bellicose"];
    // const presentationOptions = undefined;
    const lessonTypeAndData = {
      lessonType: "standardDrill",
      vocabLookupDict,
      words,
    };

    const [entries, transformedEntries] = makeStandardDrillLessonMaterial(
      lessonTypeAndData.vocabLookupDict,
      lessonTypeAndData.words,
      {}
    );

    expect(entries).toEqual([
      ["SREPBG/ROUS", "adventurous"],
      ["A/TPRAEUD", "afraid"],
      ["KPUS", "anxious"],
      ["AT/AOEZ", "at ease"],
      ["PWEL/KOES", "bellicose"],
    ]);

    expect(transformedEntries).toEqual([
      ["SREPBG/ROUS", "adventurous"],
      ["A/TPRAEUD", "afraid"],
      ["KPUS", "anxious"],
      ["AT/AOEZ", "at ease"],
      ["PWEL/KOES", "bellicose"],
    ]);
  });

  it("returns standard-ish drill lesson material with presentation options", async () => {
    const vocabLookupDict: LookupDictWithNamespacedDicts = new Map([
      ["14", [["14", "typey:typey-type.json"]]],
      ["DevOps", [["TK-F/OPS", "typey:typey-type.json"]]],
      ["hello", [["H-L", "typey:typey-type.json"]]],
      ["{co-^}", [["KOE", "typey:typey-type.json"]]],
      ["{pre-^}", [["PR*E", "typey:typey-type.json"]]],
      ["{pre^}", [["PRE", "typey:typey-type.json"]]],
      ["{mid^}", [["PHEUD", "typey:typey-type.json"]]],
      ["{mid-^}", [["PHEUD/H-PB", "typey:typey-type.json"]]],
      ["{sub^}", [["SAUB", "typey:typey-type.json"]]],
      ["{non-^}", [["TPHA*UPB", "typey:typey-type.json"]]],
      ["{non^}", [["TPHAUPB", "typey:typey-type.json"]]],
      ["{un^}", [["UPB", "typey:typey-type.json"]]],
    ]);
    const words = [
      "{un^}",
      "{co-^}",
      "{pre-^}",
      "{pre^}",
      "{sub^}",
      "{mid^}",
      "{mid-^}",
      "{non^}",
      "{non-^}",
    ];
    const presentationOptions = {
      "replaceAffixCurlies": true,
    };
    const lessonTypeAndData = {
      lessonType: "standardDrill",
      vocabLookupDict,
      words,
    };

    const [entries, transformedEntries] = makeStandardDrillLessonMaterial(
      lessonTypeAndData.vocabLookupDict,
      lessonTypeAndData.words,
      presentationOptions
    );

    expect(entries).toEqual([
      ["UPB", "{un^}"],
      ["KOE", "{co-^}"],
      ["PR*E", "{pre-^}"],
      ["PRE", "{pre^}"],
      ["SAUB", "{sub^}"],
      ["PHEUD", "{mid^}"],
      ["PHEUD/H-PB", "{mid-^}"],
      ["TPHAUPB", "{non^}"],
      ["TPHA*UPB", "{non-^}"],
    ]);

    expect(transformedEntries).toEqual([
      ["UPB", "un^"],
      ["KOE", "co-^"],
      ["PR*E", "pre-^"],
      ["PRE", "pre^"],
      ["SAUB", "sub^"],
      ["PHEUD", "mid^"],
      ["PHEUD/H-PB", "mid-^"],
      ["TPHAUPB", "non^"],
      ["TPHA*UPB", "non-^"],
    ]);
  });
});
