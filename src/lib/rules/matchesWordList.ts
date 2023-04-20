import type { DictEntry, Rules } from "../../cli-types";
import ruleTransforms from "../../consts/ruleTransforms";

const matchesWordList = (entry: DictEntry, words: string[], rules: Rules) => {
  let transformed = entry[1];

  for (const [rule, expectation] of Object.entries(rules)) {
    if (expectation && ruleTransforms[rule]) {
      transformed = ruleTransforms[rule](transformed);
    }
  }

  return words.includes(transformed);
};

export default matchesWordList;
