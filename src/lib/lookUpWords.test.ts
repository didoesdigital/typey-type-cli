import lookUpWords from "./lookUpWords";
import type { LookupDictWithNamespacedDicts } from "../shared/types";

describe("lookUpWords", () => {
  it("returns entries", async () => {
    const lookupDict: LookupDictWithNamespacedDicts = new Map([
      ["pleased", [["PHREFD", "namespaced:dict.json"]]],
    ]);

    expect(lookUpWords(["pleased"], lookupDict)).toEqual([
      ["PHREFD", "pleased"],
    ]);
  });

  it("returns entries with dashes", async () => {
    const lookupDict: LookupDictWithNamespacedDicts = new Map([
      ["self-confident", [["SEF/K-FT", "namespaced:dict.json"]]],
    ]);

    expect(lookUpWords(["self-confident"], lookupDict)).toEqual([
      ["SEF/K-FT", "self-confident"],
    ]);
  });

  it("returns affix entries with dictionary formatting in tact for affix entries without parentheses", async () => {
    const lookupDict: LookupDictWithNamespacedDicts = new Map([
      ["{non^}", [["TPHAUPB", "namespaced:dict.json"]]],
      ["non", [["TPHO*PB", "namespaced:dict.json"]]],
    ]);

    expect(lookUpWords(["non^"], lookupDict)).toEqual([["TPHAUPB", "non^"]]);
  });

  it("returns affix entries with dictionary formatting in tact for affix entries with parentheses", async () => {
    const lookupDict: LookupDictWithNamespacedDicts = new Map([
      ["{non^}", [["TPHAUPB", "namespaced:dict.json"]]],
      ["non", [["TPHO*PB", "namespaced:dict.json"]]],
    ]);

    expect(lookUpWords(["{non^}"], lookupDict)).toEqual([
      ["TPHAUPB", "{non^}"],
    ]);
  });
});
