export type PresentationTransforms = {
  [unvalidatedTransformName: string]: (translation: string) => string;
};

const presentationTransforms: PresentationTransforms = {
  replaceAffixCurlies: (translation: string) =>
    translation
      .replace(/{\^}{(\^[^^]+)}/, "$1") // {^}{^us}
      .replace(/{(\^[^^]+\^)}/, "$1") // {^both^}
      .replace(/{([^^]+\^)}/, "$1") // {right^}
      .replace(/{(\^[^^]+)}/, "$1"), // {^left}
  replaceGlueCurlies: (translation: string) =>
    translation
      .replace(/{>}{&([A-Za-z])}/, "$1") // {>}{&l}
      .replace(/{&([A-Za-z])}/, "$1"), // {&l}
  replaceArrowNavigation: (translation: string) =>
    translation.replace(/{#(Left[ ]?|Right[ ]?|Up[ ]?|Down[ ]?)+}/, ""), // {#Left Left Left} or {#Left}
  replaceCapitalisationFormatting: (translation: string) =>
    translation
      .replace(/{\*-\|}/, "")
      .replace(/{\*<}/, "")
      .replace(/[ ]?{-\|}/, "")
      .replace(/{<}/, ""),
  replaceSuppressedSpaces: (translation: string) =>
    translation.replace(/{\^}/g, ""), // {^}
};

export default presentationTransforms;
