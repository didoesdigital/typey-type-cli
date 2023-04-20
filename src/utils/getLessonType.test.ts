import getLessonType from "./getLessonType";
import type {
  LookupDictWithNamespacedDicts,
  StenoDictionary,
} from "../shared/types";

describe("getLessonType", () => {
  it("returns standard fundamental for intro lesson", async () => {
    const vocabLookupDict: LookupDictWithNamespacedDicts = new Map([
      ["the", [["-T", "typey:typey-type.json"]]],
      ["of", [["-F", "typey:typey-type.json"]]],
      ["and", [["SKP", "typey:typey-type.json"]]],
      ["was", [["WAS", "typey:typey-type.json"]]],
      ["her", [["HER", "typey:typey-type.json"]]],
      ["has", [["HAS", "typey:typey-type.json"]]],
    ]);
    const recommendedLookupDict = undefined;
    const firstRecommendedDict = undefined;
    const rules = {
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
    };
    const words = undefined; // ["was", "her", "has"];
    const title = "Introduction";

    const lessonType = getLessonType(
      vocabLookupDict,
      recommendedLookupDict,
      firstRecommendedDict,
      rules,
      words,
      title
    );

    const expectedResult = "standardFundamental";

    expect(lessonType.lessonType).toEqual(expectedResult);
  });

  it("returns non-standard fundamental for roman numerals lesson", async () => {
    const vocabLookupDict: LookupDictWithNamespacedDicts = new Map([
      ["the", [["-T", "typey:typey-type.json"]]],
      ["of", [["-F", "typey:typey-type.json"]]],
      ["and", [["SKP", "typey:typey-type.json"]]],
      ["was", [["WAS", "typey:typey-type.json"]]],
      ["her", [["HER", "typey:typey-type.json"]]],
      ["has", [["HAS", "typey:typey-type.json"]]],
    ]);
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
    const firstRecommendedDict: StenoDictionary = {
      "1-R": "I",
      "2-R": "II",
      "3-R": "III",
      "4-R": "IV",
      "5R": "V",
      "R-6": "VI",
      "R-7": "VII",
      "R-8": "VIII",
      "R-9": "IX",
      "10R": "X",
      "1-RD": "XI",
      "12-R": "XII",
    };
    const rules = {
      "isRomanNumeral": true,
    };
    const words = ["I", "II", "V", "X"];
    const title = "Roman numerals";

    const lessonType = getLessonType(
      vocabLookupDict,
      recommendedLookupDict,
      firstRecommendedDict,
      rules,
      words,
      title
    );

    const expectedResult = "nonStandardFundamental";

    expect(lessonType.lessonType).toEqual(expectedResult);
  });

  it("returns standard drill for emotions lesson with no presentation options", async () => {
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
    const recommendedLookupDict = undefined;
    const firstRecommendedDict = undefined;
    const rules = undefined;
    const words = ["adventurous", "afraid", "anxious", "at ease", "bellicose"];
    const title = "Emotions";
    // const presentationOptions = undefined;

    const lessonType = getLessonType(
      vocabLookupDict,
      recommendedLookupDict,
      firstRecommendedDict,
      rules,
      words,
      title
    );

    const expectedResult = "standardDrill";

    expect(lessonType.lessonType).toEqual(expectedResult);
  });

  it("returns standard-ish drill with presentation options for prefixes lesson", async () => {
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
    const recommendedLookupDict = undefined;
    const firstRecommendedDict = undefined;
    const rules = undefined;
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
    const title = "Prefixes";

    const lessonType = getLessonType(
      vocabLookupDict,
      recommendedLookupDict,
      firstRecommendedDict,
      rules,
      words,
      title
    );

    const expectedResult = "standardDrill";

    expect(lessonType.lessonType).toEqual(expectedResult);
  });

  it("returns non-standard drill for phrasing briefs lesson", async () => {
    // This is what a relevant vocabLookupDict dict might look like if the meta file mentioned it:
    // const vocabLookupDict: LookupDictWithNamespacedDicts = new Map([
    //   ["14", [["14", "typey:typey-type.json"]]],
    //   ["DevOps", [["TK-F/OPS", "typey:typey-type.json"]]],
    //   ["hello", [["H-L", "typey:typey-type.json"]]],
    //   ["it", [["-T", "typey:typey-type.json"]]],
    //   ["it could", [["T-BGD", "typey:typey-type.json"]]],
    // ]);
    const vocabLookupDict = undefined;
    const recommendedLookupDict: LookupDictWithNamespacedDicts = new Map([
      ["it", [["KPWH", "typey:typey-type.json"]]],
      ["it doesn't like the", [["KPWH*EBLGT", "typey:typey-type.json"]]],
      ["it could", [["KPWH-BGD", "typey:typey-type.json"]]],
      ["it can't", [["KPWH-BGT", "typey:typey-type.json"]]],
      ["it believe", [["KPWH-BL", "typey:typey-type.json"]]],
      ["it doesn't understand", [["KPWHERPBD", "typey:typey-type.json"]]],
      ["it can't", [["KPWHO", "typey:typey-type.json"]]],
      ["it don't", [["KPWHOE", "typey:typey-type.json"]]],
    ]);
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
    const rules = undefined;
    const words = [
      "it",
      "it could",
      "it can't",
      "it believe",
      "it can't",
      "it don't",
    ];
    const title = "Jade-GG: phrasing briefs";

    const lessonType = getLessonType(
      vocabLookupDict,
      recommendedLookupDict,
      firstRecommendedDict,
      rules,
      words,
      title
    );

    const expectedResult = "nonStandardDrill";

    expect(lessonType.lessonType).toEqual(expectedResult);
  });

  it("throws an error for bad meta files with undefined title", async () => {
    const vocabLookupDict = undefined;
    const recommendedLookupDict = undefined;
    const firstRecommendedDict = undefined;
    const rules = undefined;
    const words = undefined;
    const title = undefined;

    expect(() => {
      getLessonType(
        vocabLookupDict,
        recommendedLookupDict,
        firstRecommendedDict,
        rules,
        words,
        title
      );
    }).toThrowError("Unknown lesson type: undefined");
  });

  it("throws an error for bad meta files with valid title", async () => {
    const vocabLookupDict = undefined;
    const recommendedLookupDict = undefined;
    const firstRecommendedDict = undefined;
    const rules = undefined;
    const words = undefined;
    const title = "My bad lesson";

    expect(() => {
      getLessonType(
        vocabLookupDict,
        recommendedLookupDict,
        firstRecommendedDict,
        rules,
        words,
        title
      );
    }).toThrowError("Unknown lesson type: My bad lesson");
  });
});
