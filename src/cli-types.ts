import type {
  DictName,
  Outline,
  StenoDictionary,
  Translation,
} from "./shared/types";

/**
 * [outline, translation]
 *
 * Examples:
 *
 * ["TEFT", "test"]
 * ["A*P", "{&A}"]
 * ["A", "{a^}"]
 */
export type DictEntry = [Outline, Translation];

/**
 * [
 *   ["TEFT", "test"],
 *   ["A*P", "{&A}"],
 *   ["A", "{a^}"]
 * ]
 */
export type DictEntries = DictEntry[];

export type Rules = {
  isOneSyllable?: boolean; // one_syllable
  outlineIsTranslation?: boolean; // stroke_equals_translation
  hasOneKeyPerFinger?: boolean; // one_key_per_finger
  hasStretchKeys?: boolean; // stretch_keys
  fewerThanFiveCharacters?: boolean; // four_or_less_characters
  moreThanTwoCharacters?: boolean; // three_or_more_characters
  moreThanOneSyllable?: boolean; // more_than_one_syllable
  hasOnlyOneVowelKey?: boolean; // one_of_AOEU
  hasOnlyShortIVowel?: boolean; // only_short_i
  hasAnyShortVowel?: boolean; // short_vowel
  hasAnyLongVowel?: boolean; // long_vowel
  hasDiphthong?: boolean; // diphthongs
  hasVowelDisambiguator?: boolean; // vowel_disambiguators
  hasAnyVowelKey?: boolean; // vowel
  isSingleStroke?: boolean; // single_stroke
  isMultiStroke?: boolean; // multi_stroke
  hasForcedWordEnding?: boolean; // forced_word_ending
  hasOneConsonantOnEachSide?: boolean; // one_consonant_on_each_side
  hasLhsConsonantWithMultipleKeys?: boolean; // lhs_consonant_with_multiple_keys
  hasRhsConsonantWithMultipleKeys?: boolean; // rhs_consonant_with_multiple_keys
  hasDigraphs?: boolean; // digraphs
  hasCompoundClusters?: boolean; // compound_clusters
  hasSomeConsonants?: boolean; // some_consonants
  hasApostrophes?: boolean; // apostrophes
  hasDoubleLetters?: boolean; // double_letters
  hasDoubleConsonants?: boolean; // double_consonants
  hasDoubleVowels?: boolean; // double_vowels
  hasContractionsPluralsOrPossessives?: boolean; // contractions_plurals_or_possessives
  hasSimpleStenoKeys?: boolean; // simple_steno_keys
  hasUnstressedVowels?: boolean; // unstressed_vowels
  hasInversion?: boolean; // inversion
  hasSuppressedSpaceStroke?: boolean; // condensed_stroke
  hasEfAsVeeOrEss?: boolean; // ef_as_vee_or_ess
  isFingerspelled?: boolean; // fingerspelled_words
  hasNumbers?: boolean; // numbers
  hasPunctuation?: boolean; // punctuation
  hasCapitalLetter?: boolean; // contains_uppercase
  isUppercase?: boolean; // all_uppercase
  hasDictionaryFormatting?: boolean; // dictionary_format
  hasCoding?: boolean; // coding
  hasMedical?: boolean; // medical
  hasDisambiguatingBrief?: boolean; // disambiguating_brief
  hasPhillyShift?: boolean; // philly_shift
  hasShortTranslations?: boolean; // short_translations
  hasLongTranslations?: boolean; // long_translations
  hasLongWords?: boolean; // long_words
  isBrief?: boolean; // brief
  startsWithPrefix?: boolean; // prefix
  endsWithSuffix?: boolean; // suffix
  hasStar?: boolean; // star
  isRomanNumeral?: boolean;
  hasMoreThanOneConsonant?: boolean; // one_consonant_on_each_side || some_consonants
  // unique?: boolean;
  // translationExclusions?: string[];
};

export type PresentationOptions = {
  /** replace curly braces or French brackets in affix entries and preserve carets */
  replaceAffixCurlies?: boolean;
  /** replace glue curly braces or French brackets in glue entries and preserve carets */
  replaceGlueCurlies?: boolean;
  /** replace arrow navigation key commands like {#Left} */
  replaceArrowNavigation?: boolean;
  /** replace forward-looking and retrospective capitalisation or uppercase formatting */
  replaceCapitalisationFormatting?: boolean;
  /** replace suppressed space formatting like {^} */
  replaceSuppressedSpaces?: boolean;
};

/** Examples:
 *  `["punctuation.json", { "SKHRAPL": "{!}", "TP-PL": "{.}" }]`
 *  `["personal.json", { "TPRAPBG/PAPB/SKWREU": "frangipani", "TPHR-BGS": "analytics" }]`
 */
export type DictionaryNameAndContents = [DictName, StenoDictionary];

/** e.g. "Belling the Cat" */
export type PrettyLessonTitle = string;
export type Category = "Fundamentals" | "Drills" | "Stories" | "Collections";
/** e.g. "Irreversible binomials" */
export type Subcategory = string;
/** e.g. ["adventurous", "afraid", "alarmed"] */
export type WordList = string[];
/** e.g. ["../lesson-intermediate-data/typey-type-standard-dict-set-combined.json"] */
export type Vocabulary = string[];
/** e.g. ["didoesdigital/punctuation.json"] */
export type RecommendedDictionarySet = string[];

export type ParsedMeta = {
  title: PrettyLessonTitle;
  subtitle: "";
  category: Category;
  subcategory: Subcategory;
  path: LessonPathWithoutBasenameAndWithFilename;
  recommendedDictionarySet?: RecommendedDictionarySet;
  rules?: Rules;
  vocabulary?: Vocabulary;
  wordList?: WordList;
  presentationOptions?: PresentationOptions;
  /** e.g. ["pos", "sol", "spas", "pros"] */
  translationExclusions?: Translation[];
  /** e.g. "Hint: use exact spacing setting" */
  customMessage?: string;
  /** e.g. "^" */
  ignoredCharacters?: string;
  /** e.g. "ux-vocabulary" */
  slug?: string;
};

/**
 * Example: "/fundamentals/introduction/lesson-overview.html"
 * Example: "/fundamentals/introduction/lesson.txt"
 */
export type LessonPathWithoutBasenameAndWithFilename = string;
