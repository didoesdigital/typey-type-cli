export type RuleTransforms = {
  // one day, we could make ruleName here match Rules and require a validation check
  [ruleName: string]: (translation: string) => string;
};

const ruleTransforms: RuleTransforms = {
  // hasDictionaryFormatting: (translation: string) =>
  //   translation.replace("{}", "").replace("{-|}", ""),
  hasPunctuation: (translation: string) =>
    translation.replace(/{&%}/, "%").replace(/{\^%}/, "%"),
  isFingerspelled: (translation: string) =>
    translation.replace(/{>}{&([a-z])}/, "$1").replace(/{&([A-Z])}/, "$1"),
  // hasNumbers: (translation: string) => translation.replace(/^0$/, "#O"),
};

export default ruleTransforms;
