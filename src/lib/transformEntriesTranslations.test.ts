import transformEntriesTranslations from "./transformEntriesTranslations";
import type { DictEntries, PresentationOptions, Rules } from "../cli-types";

const rules: Rules = { isFingerspelled: true, hasPunctuation: true };

const presentationOptions: PresentationOptions = { replaceAffixCurlies: true };

describe("transformEntriesTranslations with rules", () => {
  it("returns lowercase entries without glue characters", async () => {
    const entries: DictEntries = [
      ["A*", "{>}{&a}"],
      ["A", "{a^}"],
    ];

    expect(transformEntriesTranslations(entries, rules)).toEqual([
      ["A*", "a"],
      ["A", "{a^}"],
    ]);
  });

  it("returns uppercase entries without glue characters", async () => {
    const entries: DictEntries = [
      ["A*P", "{&A}"],
      ["A", "{a^}"],
    ];

    expect(transformEntriesTranslations(entries, rules)).toEqual([
      ["A*P", "A"],
      ["A", "{a^}"],
    ]);
  });

  it("returns percent sign without glue", async () => {
    const entries: DictEntries = [
      ["P*ERS", "{&%}"],
      ["PHERS", "{^%}"],
      ["PERS", "percent"],
    ];

    expect(transformEntriesTranslations(entries, rules)).toEqual([
      ["P*ERS", "%"],
      ["PHERS", "%"],
      ["PERS", "percent"],
    ]);
  });
});

describe("transformEntriesTranslations with presentation options", () => {
  it("handle all the affix things", async () => {
    const entries: DictEntries = [
      ["TPHO*PB", "non"],
      ["TPHAUPB", "{non^}"],
      ["H-PB", "{^-^}"],
      ["STER", "{^ster}"],
      ["SKWRUS", "{^}{^us}"],
      ["TPR-BGT/TPEUFRT/KPA*/TPHAEUPL/TPR*BGT", "{firstName}"],
    ];

    expect(transformEntriesTranslations(entries, presentationOptions)).toEqual([
      ["TPHO*PB", "non"],
      ["TPHAUPB", "non^"],
      ["H-PB", "^-^"],
      ["STER", "^ster"],
      ["SKWRUS", "^us"],
      ["TPR-BGT/TPEUFRT/KPA*/TPHAEUPL/TPR*BGT", "{firstName}"],
    ]);
  });

  it("handle markdown things", async () => {
    const presentationOptions: PresentationOptions = {
      replaceArrowNavigation: true,
      replaceCapitalisationFormatting: true,
      replaceSuppressedSpaces: true,
    };
    const entries: DictEntries = [
      ["-6RB", "{^}###### {-|}"],
      ["HRAOUL", "{^}--------------------"],
      ["SKH-FGS/PWHROBG/SKH*FGS", "{^}```block```{^}"],
      ["PH*LG", "[](){#Left Left Left}{^}"],
    ];

    expect(transformEntriesTranslations(entries, presentationOptions)).toEqual([
      ["-6RB", "######"],
      ["HRAOUL", "--------------------"],
      ["SKH-FGS/PWHROBG/SKH*FGS", "```block```"],
      ["PH*LG", "[]()"],
    ]);
  });
});
