import { Translation } from "src/shared/types";
import ruleTransforms from "../../consts/ruleTransforms";
import type { Rules } from "../../cli-types";

const matchesWordList = (
  translation: Translation,
  words: string[],
  rules: Rules
) => {
  let transformed = translation;

  for (const [rule, expectation] of Object.entries(rules)) {
    if (expectation && ruleTransforms[rule]) {
      transformed = ruleTransforms[rule](transformed);
    }
  }

  return words.includes(transformed);
};

export default matchesWordList;
