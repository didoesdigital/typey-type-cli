import AFFIXES from "../shared/utils/affixes/affixes";
import loadAffixes from "../lib/loadAffixesFromFile";
import combineDictNamesAndContentsIntoDict from "./combineDictNamesAndContentsIntoDict";

describe("combineDictNamesAndContentsIntoDict", () => {
  beforeAll(() => {
    AFFIXES.setLoadFunction(loadAffixes);
  });

  it("combines dictionaries in given order, ranking duplicate outlines, then overriding previous entries, with top-10000-project-gutenberg-words.json trumping all others, to produce typey-type.json", async () => {
    expect(
      combineDictNamesAndContentsIntoDict([
        ["dict1.json", { TEFT: "test1", TEFTD: "tested" }],
        ["dict2.json", { TEFT: "test2", TEFGT: "test1" }],
      ])
    ).toEqual({
      TEFT: "test2",
      TEFTD: "tested",
    });
  });

  it("combines dictionaries into typey-type.json where top Project Gutenberg dictionary entries win over shorter outlines", async () => {
    expect(
      combineDictNamesAndContentsIntoDict([
        ["top-10000-project-gutenberg-words.json", { TEFT: "test1" }],
        ["dict2.json", { TEF: "test1" }],
      ])
    ).toEqual({
      TEFT: "test1",
    });
  });

  it("combines dictionaries into typey-type.json where translation could also be expressed with unicode escapes", async () => {
    expect(
      combineDictNamesAndContentsIntoDict([
        ["dict.json", { "TKW-D": "÷" }],
        ["symbols-briefs.json", { "TKWAO*EUD": "÷" }],
        ["other.json", { "TKW-D": "\u00f7" }],
      ])
    ).toEqual({
      "TKW-D": "÷",
    });
  });

  it("combines dictionaries into intermediate dictionary with good entry for hors d'oeuvres", async () => {
    expect(
      combineDictNamesAndContentsIntoDict([
        ["condensed-strokes.json", { "HOR/TKEFRBZ": "hors d'oeuvres" }],
        [
          "dict.json",
          {
            "HOR/TKEFRB/-S": "hors d'oeuvres",
            "O*R/TK*EFRBS": "hors d'oeuvres",
            "O*R/TK*EFRBZ": "hors d'oeuvres",
            "O*R/TK*EFRS": "hors d'oeuvres",
            "O*R/TK*EFRZ": "hors d'oeuvres",
            "O*R/TKEFRBS": "hors d'oeuvres",
            "O*R/TKEFRBZ": "hors d'oeuvres",
            "O*R/TKER/*FS": "hors d'oeuvres",
            "OR/TK*EFRS": "hors d'oeuvres",
            "OR/TK*EFRZ": "hors d'oeuvres",
            "OR/TKER/*FS": "hors d'oeuvres",
          },
        ],
      ])
    ).toEqual({
      "HOR/TKEFRBZ": "hors d'oeuvres",
      // If we kept all entries:
      // "HOR/TKEFRB/-S": "hors d'oeuvres",
      // "O*R/TK*EFRBS": "hors d'oeuvres",
      // "O*R/TK*EFRBZ": "hors d'oeuvres",
      // "O*R/TK*EFRS": "hors d'oeuvres",
      // "O*R/TK*EFRZ": "hors d'oeuvres",
      // "O*R/TKEFRBS": "hors d'oeuvres",
      // "O*R/TKEFRBZ": "hors d'oeuvres",
      // "O*R/TKER/*FS": "hors d'oeuvres",
      // "OR/TK*EFRS": "hors d'oeuvres",
      // "OR/TK*EFRZ": "hors d'oeuvres",
      // "OR/TKER/*FS": "hors d'oeuvres",
    });
  });
});
