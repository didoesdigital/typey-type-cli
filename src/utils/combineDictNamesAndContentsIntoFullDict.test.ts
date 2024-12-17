import combineDictNamesAndContentsIntoFullDict from "./combineDictNamesAndContentsIntoFullDict";

describe("combineDictNamesAndContentsIntoFullDict", () => {
  it("combines dictionaries in given order, overriding previous entries to produce typey-type-full.json, then ordering by steno order", async () => {
    expect(
      combineDictNamesAndContentsIntoFullDict([
        ["dict1.json", { TEFT: "test1", TEFTD: "tested" }],
        ["dict2.json", { TEFT: "test2", TEFGT: "test1" }],
      ])
    ).toEqual({
      TEFT: "test2",
      TEFTD: "tested",
      TEFGT: "test1",
    });
  });

  it("combines dictionaries into typey-type-full.json based on order of dictionaries, ignoring Project Gutenberg dictionary, and then sorting dictionary by steno order", async () => {
    expect(
      combineDictNamesAndContentsIntoFullDict([
        ["top-10000-project-gutenberg-words.json", { TEFT: "test1" }],
        ["dict2.json", { TEF: "test1" }],
      ])
    ).toEqual({
      TEF: "test1",
      TEFT: "test1",
    });
  });

  it("combines dictionaries into typey-type-full.json where translation could also be expressed with unicode escapes", async () => {
    expect(
      combineDictNamesAndContentsIntoFullDict([
        ["dict.json", { "TKW-D": "÷" }],
        ["symbols-briefs.json", { "TKWAO*EUD": "÷" }],
        ["other.json", { "TKW-D": "\u00f7" }],
      ])
    ).toEqual({
      "TKW-D": "÷",
      "TKWAO*EUD": "÷",
    });
  });

  it("combines dictionaries into typey-type-full.json with lots of entries for hors d'oeuvres", async () => {
    expect(
      combineDictNamesAndContentsIntoFullDict([
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
    });
  });
});
