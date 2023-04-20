import type { Rules } from "../cli-types";
import type {
  LookupDictWithNamespacedDicts,
  StenoDictionary,
} from "../shared/types";

type StandardFundamentalsLessonType = {
  lessonType: "standardFundamental";
  vocabLookupDict: LookupDictWithNamespacedDicts;
  rules: Rules;
};

type NonStandardFundamentalsLessonType = {
  lessonType: "nonStandardFundamental";
  recommendedLookupDict: LookupDictWithNamespacedDicts;
  rules: Rules;
  words: string[];
};

type StandardDrillsLessonType = {
  lessonType: "standardDrill";
  vocabLookupDict: LookupDictWithNamespacedDicts;
  words: string[];
};

type NonStandardDrillsLessonType = {
  lessonType: "nonStandardDrill";
  words: string[];
  firstRecommendedDict: StenoDictionary;
};

/**
 * Gets the lesson type category and how standard it is
 *
 * @remarks
 * This method mostly only needs to return the lesson type, but we also return the data with its
 * types so we have no undefined types when we use the specific lesson type's data
 */
const getLessonType = (
  vocabLookupDict: LookupDictWithNamespacedDicts | undefined,
  recommendedLookupDict: LookupDictWithNamespacedDicts | undefined,
  firstRecommendedDict: StenoDictionary | undefined,
  rules: Rules | undefined,
  words: string[] | undefined,
  title: string | undefined
) => {
  // Fundamentals find entries that match rules from top 10000 words
  if (vocabLookupDict && rules && !(recommendedLookupDict && words)) {
    const result: StandardFundamentalsLessonType = {
      lessonType: "standardFundamental",
      vocabLookupDict,
      rules,
    };
    return result;
  }

  // Non-standard Fundamentals find entries from a recommended dictionary that match rules
  // "Roman numerals", "Fingerspelling", "Punctuation", "Numbers"
  if (recommendedLookupDict && words && rules) {
    const result: NonStandardFundamentalsLessonType = {
      lessonType: "nonStandardFundamental",
      recommendedLookupDict,
      words,
      rules,
    };
    return result;
  }

  // Standard Drills/Stories/Collections look up best steno outline for each provided word
  if (vocabLookupDict && !recommendedLookupDict && words) {
    const result: StandardDrillsLessonType = {
      lessonType: "standardDrill",
      vocabLookupDict,
      words,
    };
    return result;
  }

  if (!vocabLookupDict && firstRecommendedDict && words) {
    const result: NonStandardDrillsLessonType = {
      lessonType: "nonStandardDrill",
      firstRecommendedDict,
      words,
    };
    return result;
  }

  throw new Error(`Unknown lesson type: ${title}`);
};

export default getLessonType;
