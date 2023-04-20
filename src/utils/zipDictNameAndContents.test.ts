import zipDictNameAndContents from "./zipDictNameAndContents";
import type { DictName, StenoDictionary } from "../shared/types";

describe("zipDictNameAndContents", () => {
  it("puts dictionary names and contents together", async () => {
    const names: DictName[] = [
      "abbreviations.json",
      "briefs.json",
      "currency.json",
    ];

    const contents: StenoDictionary[] = [
      { "PAEUFP": "pH" },
      { "HRAOPBG": "along", "HUFRBL": "humble" },
      { "PH-LD": "million dollar", "PH-LDZ": "million dollars" },
    ];

    expect(zipDictNameAndContents(names, contents)).toEqual([
      ["abbreviations.json", { "PAEUFP": "pH" }],
      ["briefs.json", { "HRAOPBG": "along", "HUFRBL": "humble" }],
      [
        "currency.json",
        { "PH-LD": "million dollar", "PH-LDZ": "million dollars" },
      ],
    ]);
  });

  it("puts dictionary names and contents together with lots of outlines for 1 entry", async () => {
    const names: DictName[] = ["condensed-strokes.json", "dict.json"];

    const contents: StenoDictionary[] = [
      {
        "HOR/TKEFRBZ": "hors d'oeuvres",
      },
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
    ];

    expect(zipDictNameAndContents(names, contents)).toEqual([
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
    ]);
  });
});
